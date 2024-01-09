const crypto = require("crypto");

// Generate Password Reset Token
const createResetToken = async () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  return resetToken;
};

// Generate Hashed Token
const createHashedToken = async ({ token }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return hashedToken;
};

module.exports = { createResetToken, createHashedToken };
