const { errors } = require("../../../../errors");
const { Course } = require("../../../../models");

const remove = async ({ courseId }) => {
  // If courseId doesn't pass then throw a BadRequestError
  if (!courseId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    /**
     *||------------------------------------||
     *
     *                 LATER
     *     NEED SOME WORK FOR CLOUDINARY
     *
     *
     * const isExistCourse=await Course.findById(courseId)
     * 
     * // If isExistCourse doesn't exist
       if (!isExistCourse) {
        throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
       }
     *
     * If(isExistCourse.imageId){
     *   await cloudinary.uploader.destroy(isExistCourse.imageId);
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete course
    const course = await Course.findByIdAndDelete(courseId);

    // If course doesn't exist
    if (!course) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the course is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_COURSE]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Course Deletion Failed");
  }
};

module.exports = { remove };
