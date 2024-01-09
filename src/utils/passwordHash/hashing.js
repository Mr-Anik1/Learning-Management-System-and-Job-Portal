const bcrypt = require("bcrypt");
const { errors } = require("../../errors");
const defaults = require("../../config/defaults");

// Plain text password to hash password
const generateHash = async ({ paylod, saltRound = defaults.saltRound }) => {
  try {
    const hashPassword = await bcrypt.hash(paylod, saltRound);

    return hashPassword;
  } catch (err) {
    if (err.message) {
      console.log(`[HASH_PASSWORD] ${err.message}`);
    }

    throw new errors.InternalServerError(`Password Hashing Failed`);
  }
};

// Compare password ~ password valid or not
const compareHash = async ({ plainTextPassword, hashPassword }) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashPassword);

    return isMatch;
  } catch (err) {
    if (err.message) {
      console.log(`[COMPARE_PASSWORD] ${err.message}`);
    }

    throw new errors.InternalServerError(`Password Compare Failed`);
  }
};

module.exports = { generateHash, compareHash };
