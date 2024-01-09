const { errors } = require("../../errors");
const { userServicesV1 } = require("../../lib/v1/user");

// userOwnership function returns another function that is a middleware
const userOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { id },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to User
      if (model === "User") {
        // Check Ownership
        const isOwner = await userServicesV1.checkUserOwnership({
          resourceId: id,
          userId,
          role,
        });

        // If isOwner is true then turn to next step
        if (isOwner) {
          return next();
        }
      }

      // Otherwise throw error in next step
      return next(new errors.AuthorizationError(`Ownership Failed`));
    } catch (err) {
      next(err);
    }
  };

module.exports = { userOwnership };
