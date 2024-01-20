const { errors } = require("../../../../errors");
const { Course } = require("../../../../models");

const findSingleForAdminAndInstructor = async ({ courseId }) => {
  // If id doesn't pass
  if (!courseId) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single course with id
    const course = await Course.findById(courseId).select("-imageId").populate({
      path: "instructor",
      select: "_id firstname lastname profilePicture email profession role",
    });

    // If course doesn't exist
    if (!course) {
      throw Error;
    }

    return course;
  } catch (err) {
    if (err.message) {
      console.log(
        `[FIND_SINGLE_COURSE_FOR_ADMIN_AND_INSTRUCTOR]: ${err.message}`
      );
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingleForAdminAndInstructor };
