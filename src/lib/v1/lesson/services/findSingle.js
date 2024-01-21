const { Lesson } = require("../../../../models");
const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");

const findSingle = async ({ lessonId }) => {
  // If lessonId doesn't pass
  if (!lessonId) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  // First check lessonId is a valid mongodb id or not
  isValidObjectId({ id: lessonId, nameOfId: "LessonID" });

  try {
    // Find a single lesson
    const lesson = await Lesson.findById(lessonId);

    // If lesson doesn't exist
    if (!lesson) {
      throw Error;
    }

    return lesson;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_LESSON]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
