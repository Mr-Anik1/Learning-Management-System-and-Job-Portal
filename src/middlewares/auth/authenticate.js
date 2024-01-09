const { errors } = require("../../errors");
const { tokenServicesV1 } = require("../../lib/v1/token");
const { userServicesV1 } = require("../../lib/v1/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    // If authorization string doesn't exist
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw Error;
    }

    // Seperate token form authoriztion string
    const token = authorization.split(" ")[1];
    const decoded = tokenServicesV1.verifyToken({ token });
    const { userId, name, role, status } = decoded;

    // Find user by userId
    const user = await userServicesV1.findUserById({ id: userId });

    // If user doesn't exist then throw error
    if (!user) {
      throw Error;
    }

    //If user status is not equal approved then throw UnauthenticatedError
    if (user.status !== "approved") {
      return next(
        new errors.UnauthenticatedError(`Your account status is ${user.status}`)
      );
    }

    // user Object sent to request Object
    req.user = { userId, name, role, status };

    next();
  } catch (err) {
    if (err.message) {
      console.log(`[AUTHENTICATE_MIDDLEWARE]: ${err.message}`);
    }

    next(new errors.UnauthenticatedError(`Authentication Invalid`));
  }
};

module.exports = { authenticate };
