// All password controllers have been imported
const { forgotPasswordToken } = require("./forgotPasswordToken");
const { resetPassword } = require("./resetPassword");

// All password controllers have been exported
module.exports = { forgotPasswordToken, resetPassword };
