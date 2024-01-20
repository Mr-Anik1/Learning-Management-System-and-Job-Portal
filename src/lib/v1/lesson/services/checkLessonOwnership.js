const { singleLessonById } = require("./singleLessonById");
const { errors } = require("../../../../errors");

const checkLessonOwnership = async ({ resourceId, userId, role }) => {
  try {
    /**
     * @If_user_is_a_admin
     */
    if (role === "admin") {
      return true;
    }

    /**
     * @If_user_is_not_admin
     */
    // Find lesson by id
    const lesson = await singleLessonById({ lessonId: resourceId });

    // If lesson is doesn't exist
    if (!lesson) {
      throw Error;
    }

    // If the instructor that is inside the lesson matches the requested userId(Bearer)
    if (lesson.instructor.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_LESSON_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Your requested lesson doesn't exist`);
  }
};

module.exports = { checkLessonOwnership };
