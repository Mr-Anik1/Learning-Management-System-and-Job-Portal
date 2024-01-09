// All authentication services have been imported
const { register } = require("./register");
const { login } = require("./login");

// All authentication services have been exported
module.exports = { register, login };
