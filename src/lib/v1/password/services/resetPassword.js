const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");
const { passwordHash } = require("../../../../utils");
const { User } = require("../../../../models");

const resetPassword = async ({ password, token }) => {
  // If password or token doesn't pass then throw a BadRequestError
  if (!password || !token) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Generate Hashed Token
    const hashedToken = await passwordHash.createHashedToken({ token });

    const updateQuery = {};
    // Password must be hashed before store in the DataBase
    const encryptedPassword = await passwordHash.generateHash({
      paylod: password,
    });
    // This fields will be updated
    updateQuery.password = encryptedPassword;
    updateQuery.passwordChangedAt = new Date();
    updateQuery.passwordResetToken = "";
    updateQuery.passwordResetExpires = new Date(0);

    /**
     * @If_User_is_Exist
     * Find user by its reset token and expires date, if user is exist then reset password
     */

    const updatedUser = await User.findOneAndUpdate(
      {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          $gt: Date.now(),
        }, //Find documents where the passwordResetExpires field's value is greater than the current timestamp. passwordResetExpires > Date.now()
      },
      updateQuery,
      { new: true, runValidators: true }
    );

    // If user doesn't exist
    if (!updatedUser) {
      throw new errors.BadRequestError(`Token Expired, Please Try Again.`);
    }

    // Return the reset password success code
    return { resetSuccessCode: 200 };
  } catch (err) {
    if (err.message) {
      console.log(`[RESET_PASSWORD]: ${err.message}`);
    }

    // If error is instance of BadRequestError
    if (err.code === StatusCodes.BAD_REQUEST) {
      throw new errors.BadRequestError(err.message);
    }

    throw new errors.InternalServerError(`Password Reset Failed`);
  }
};

module.exports = { resetPassword };
