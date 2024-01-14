const { Blog } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and categoryType doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single blog
    const blog = await Blog.findOne({
      slug,
      categorySlug: categoryType,
    }).select("-thumbnailId");

    // Find simillar blog topic with categorySlug
    const blogTopic = await Blog.find({ categorySlug: categoryType }).select(
      "title slug categorySlug"
    );

    // If blog doesn't exist
    if (!blog) {
      throw Error;
    }

    return { blog, blogTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_BLOG]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
