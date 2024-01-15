const { errors } = require("../../../../errors");
const { CourseCategory } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete course category
    const courseCategory = await CourseCategory.findByIdAndDelete(id);

    // If courseCategory doesn't exist
    if (!courseCategory) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the courseCategory is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_COURSE_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Course Category Deletion Failed");
  }
};

module.exports = { remove };
