const { errors } = require("../../errors");

// authorization function return another function that is a middleware
const authorize =
  ({ roles = ["admin"] }) =>
  (req, res, next) => {
    const { role } = req.user;

    try {
      // If user role doesn't include in roles array
      if (!roles.includes(role)) {
        return next(
          new errors.AuthorizationError(
            `You do not have enough privileges to perform actions on the resource`
          )
        );
      }

      next();
    } catch (err) {
      next(new errors.AuthorizationError(`Authorization Failed`));
    }
  };

module.exports = { authorize };
