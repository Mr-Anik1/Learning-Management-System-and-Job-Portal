const { courseServicesV1 } = require("../../lib/v1/course");
const { errors } = require("../../errors");

// Course ownership function is returns another functin that is a middleware
const courseOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { courseId },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to Course
      if (model === "Course") {
        // Check Course Ownership
        const isOwner = await courseServicesV1.checkCourseOwnership({
          resourceId: courseId,
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

module.exports = { courseOwnership };
