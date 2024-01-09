// All password services have been imported
const { forgotPasswordToken } = require("./forgotPasswordToken");
const { resetPassword } = require("./resetPassword");

// All password services have been exported
module.exports = { forgotPasswordToken, resetPassword };
