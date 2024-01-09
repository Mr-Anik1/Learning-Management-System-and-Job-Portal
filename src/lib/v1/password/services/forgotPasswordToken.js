const { User } = require("../../../../models");
const { errors } = require("../../../../errors");
const { passwordHash } = require("../../../../utils");
const { StatusCodes } = require("http-status-codes");
const { emailServicesV1 } = require("../../email");

const forgotPasswordToken = async ({ email }) => {
  // If email doesn't pass
  if (!email) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create Reset Token
    const token = await passwordHash.createResetToken();
    // Generate Hashed Token
    const hashedToken = await passwordHash.createHashedToken({ token });

    // Update User filds( passwordResetToken and passwordResetExpires )
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        passwordResetToken: hashedToken,
        passwordResetExpires: Date.now() + 10 * 60 * 1000,
      },
      { new: true, runValidators: true }
    );

    // If updatedUser doesn't exist
    if (!updatedUser) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
    }

    /**
     * @Create_Reset_Link_and_send_mail
     */
    // Generate Reset Link
    const resetLink = `${process.env.HTTP_LINK}/api/v1/password/reset-password/${token}`;

    // Generate Data for Sending Mail
    const data = {
      to: email,
      subject: `Forgot Password`,
      text: `Hey ${updatedUser.firstname} ${updatedUser.lastname}`,
      html: resetLink,
    };

    // Send Mail
    await emailServicesV1.sendEmail({ data });

    // Return the data for reset password
    return data;
  } catch (err) {
    if (err.message) {
      console.log(`[FORGOT_PASSWORD_TOKEN]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
    }

    throw new errors.InternalServerError(`Something Went Wrong`);
  }
};

module.exports = { forgotPasswordToken };
