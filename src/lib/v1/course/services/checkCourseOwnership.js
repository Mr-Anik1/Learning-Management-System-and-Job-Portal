const { singleCourseById } = require("./singleCourseById");
const { errors } = require("../../../../errors");

const checkCourseOwnership = async ({ resourceId, userId, role }) => {
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
    // Find course by id
    const course = await singleCourseById({ courseId: resourceId });

    // If course is doesn't exist
    if (!course) {
      throw Error;
    }

    // If the instructor that is inside the course matches the requested userId(Bearer)
    if (course.instructor.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_COURSE_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Your requested course doesn't exist`);
  }
};

module.exports = { checkCourseOwnership };
