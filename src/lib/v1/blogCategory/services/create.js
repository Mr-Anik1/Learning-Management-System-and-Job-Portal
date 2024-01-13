const { BlogCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title }) => {
  // If title doesn't exist
  if (!title) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new blogCategory
    const blogCategory = new BlogCategory({
      title,
    });
    await blogCategory.save();

    // If new blogCategory doesn't create
    if (!blogCategory) {
      throw Error;
    }

    return blogCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_BLOG_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Blog Category Creation Failed`);
  }
};

module.exports = { create };
