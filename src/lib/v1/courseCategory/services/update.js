const { CourseCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, title, slug }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate update query for course category update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  try {
    // Update course category
    const courseCategory = await CourseCategory.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If courseCategory doesn't exist
    if (!courseCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return courseCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_COURSE_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Course Category Update Failed");
  }
};

module.exports = { update };
