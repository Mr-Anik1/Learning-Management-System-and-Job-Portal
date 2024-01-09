// All authentication controllers have been imported
const { register } = require("./register");
const { login } = require("./login");

// All authentication controllers have been exported
module.exports = { register, login };
