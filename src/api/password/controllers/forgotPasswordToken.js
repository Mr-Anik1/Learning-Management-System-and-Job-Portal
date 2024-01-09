const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { passwordServicesV1 } = require("../../../lib/v1/password");

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Password Reset Data
  const passwordResetData = await passwordServicesV1.forgotPasswordToken({
    email,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `${passwordResetData.text}, a password reset link has been sent via email to ${passwordResetData.to}`,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { forgotPasswordToken };
