const { lessonServicesV1 } = require("../../lib/v1/lesson");
const { errors } = require("../../errors");

// Lesson ownership function is returns another functin that is a middleware
const lessonOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { lessonId },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to Lesson
      if (model === "Lesson") {
        // Check Lesson Ownership
        const isOwner = await lessonServicesV1.checkLessonOwnership({
          resourceId: lessonId,
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

module.exports = { lessonOwnership };
