const asyncHandler = require("express-async-handler");
const { passwordServicesV1 } = require("../../../lib/v1/password");

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const token = req.params?.token;

  // Reset Password
  const { resetSuccessCode } = await passwordServicesV1.resetPassword({
    password,
    token,
  });

  // Generate Response
  const response = {
    code: resetSuccessCode,
    message: "Password Reset Successfully",
    links: {
      self: req.url,
    },
  };

  res.status(resetSuccessCode).json(response);
});

module.exports = { resetPassword };
