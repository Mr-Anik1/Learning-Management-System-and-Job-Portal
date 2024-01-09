const jwt = require("jsonwebtoken");
const { errors } = require("../../../../errors");
const { userServicesV1 } = require("../../user");
const defaults = require("../../../../config/defaults");

// Generate JWT Token for Register
const generateTokenForRegister = async ({
  userId,
  name,
  role,
  status,
  secret = defaults.secret,
  algorithm = defaults.algorithm,
  expiresIn = defaults.expiresIn,
}) => {
  try {
    // If userId,name,role and status doesn't exist
    if (!userId || !name || !role || !status) {
      throw Error;
    }

    // Generate JWT Token
    const token = jwt.sign({ userId, name, role, status }, secret, {
      algorithm,
      expiresIn,
    });

    // If token doesn't create
    if (!token) {
      throw Error;
    }

    return token;
  } catch (err) {
    if (err.message) {
      console.log(`[JWT]`, err.message);
    }

    // If token doesn't create then delete the newly created user from the database.
    await userServicesV1.remove({ id: userId });

    throw new errors.InternalServerError(`Token Generation Failed`);
  }
};

// Generate JWT Token for Login
const generateTokenForLogin = ({
  userId,
  name,
  role,
  status,
  secret = defaults.secret,
  algorithm = defaults.algorithm,
  expiresIn = defaults.expiresIn,
}) => {
  try {
    // If userId,name,role and status doesn't exist
    if (!userId || !name || !role || !status) {
      throw Error;
    }

    // Generate JWT Token
    const token = jwt.sign({ userId, name, role, status }, secret, {
      algorithm,
      expiresIn,
    });

    // If token doesn't create
    if (!token) {
      throw Error;
    }

    return token;
  } catch (err) {
    if (err.message) {
      console.log(`[JWT]`, err.message);
    }

    throw new errors.InternalServerError(`Token Generation Failed`);
  }
};

// Verify JWT Token
const verifyToken = ({
  token,
  secret = defaults.secret,
  algorithm = defaults.algorithm,
}) => {
  try {
    // If token doesn't exist
    if (!token) {
      throw Error;
    }

    // Token verify and return
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (err) {
    if (err.message) {
      console.log(`[JWT]: `, err.message);
    }

    throw new errors.InternalServerError(`Token Verify Failed`);
  }
};

// Decode JWT Token
const decodeToken = ({ token, algorithm = defaults.algorithm }) => {
  try {
    // If token doesn't exist
    if (!token) {
      throw Error;
    }

    // Token decode and return
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (err) {
    if (err.message) {
      console.log(`[JWT]`, err.message);
    }

    throw new errors.InternalServerError(`Token Decode Failed`);
  }
};

module.exports = {
  generateTokenForRegister,
  verifyToken,
  decodeToken,
  generateTokenForLogin,
};
