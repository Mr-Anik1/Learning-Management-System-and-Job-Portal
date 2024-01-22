const { workWithUsServicesV1 } = require("../../lib/v1/workWithUs");
const { errors } = require("../../errors");

// workWithUS ownership function is returns another functin that is a middleware
const workWithUsOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { id },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to WorkWithUS
      if (model === "WorkWithUS") {
        // Check WorkWithUS Ownership
        const isOwner = await workWithUsServicesV1.checkWorkWithUsOwnership({
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

module.exports = { workWithUsOwnership };
