const { errors } = require("../../../../errors");
const { Course } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const singleCourseById = async ({ courseId }) => {
  // If courseId doesn't pass
  if (!courseId) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  // Check courseId is valid or not
  isValidObjectId({
    id: courseId,
    nameOfId: "CourseID",
  });

  try {
    // Find a single course with id
    const course = await Course.findById(courseId).select("-imageId");

    return course ? course : false;
  } catch (err) {
    if (err.message) {
      console.log(`[SINGLE_COURSE_BY_ID]: ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Your requested course doesn't exist with this ID`
    );
  }
};

module.exports = { singleCourseById };
