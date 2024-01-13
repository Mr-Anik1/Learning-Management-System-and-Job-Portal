const { BlogCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single blog category
    const blogCategory = await BlogCategory.findById(id);

    // If blogCategory doesn't exist
    if (!blogCategory) {
      throw Error;
    }

    return blogCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_BLOG_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
