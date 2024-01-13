const { BlogCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, title, slug }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate update query for blog category update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  try {
    // Update blog category
    const blogCategory = await BlogCategory.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If blogCategory doesn't exist
    if (!blogCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return blogCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_BLOG_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Blog Category Update Failed");
  }
};

module.exports = { update };
