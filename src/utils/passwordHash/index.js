// All passwordHash utils have been imported
const { generateHash, compareHash } = require("./hashing");
const { createHashedToken, createResetToken } = require("./generateToken");

// All passwordHash utils have been exported
module.exports = {
  generateHash,
  compareHash,
  createHashedToken,
  createResetToken,
};
