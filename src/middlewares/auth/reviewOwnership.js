const { reviewServicesV1 } = require("../../lib/v1/review");
const { errors } = require("../../errors");

// Review ownership function is returns another functin that is a middleware
const reviewOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { id },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to Review
      if (model === "Review") {
        // Check Review Ownership
        const isOwner = await reviewServicesV1.checkReviewOwnership({
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

module.exports = { reviewOwnership };
