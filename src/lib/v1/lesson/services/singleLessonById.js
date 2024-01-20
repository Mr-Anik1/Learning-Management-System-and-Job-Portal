const { errors } = require("../../../../errors");
const { Lesson } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const singleLessonById = async ({ lessonId }) => {
  // If lessonId doesn't pass
  if (!lessonId) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  // Check lessonId is valid or not
  isValidObjectId({
    id: lessonId,
    nameOfId: "lessonID",
  });

  try {
    // Find a single lesson with id
    const lesson = await Lesson.findById(lessonId);

    return lesson ? lesson : false;
  } catch (err) {
    if (err.message) {
      console.log(`[SINGLE_LESSON_BY_ID]: ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Your requested lesson doesn't exist with this ID`
    );
  }
};

module.exports = { singleLessonById };
