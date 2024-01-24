const { bookSessionServicesV1 } = require("../../lib/v1/bookSession");
const { errors } = require("../../errors");

// Book-A-Session ownership function is returns another functin that is a middleware
const bookSessionOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { bookSessionId },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to BookSession
      if (model === "BookSession") {
        // Check BookSession Ownership
        const isOwner = await bookSessionServicesV1.checkBookSessionOwnership({
          resourceId: bookSessionId,
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

module.exports = { bookSessionOwnership };
