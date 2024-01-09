// All token services have been imported
const {
  generateTokenForRegister,
  verifyToken,
  decodeToken,
  generateTokenForLogin,
} = require("./accessToken");

// All token services have been exported
module.exports = {
  generateTokenForRegister,
  verifyToken,
  decodeToken,
  generateTokenForLogin,
};
