const { errors } = require("../../../../errors");
const { Course } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete course
    const course = await Course.findByIdAndDelete(id);

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
