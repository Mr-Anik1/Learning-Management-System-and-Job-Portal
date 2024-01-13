const { Blog } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug }) => {
  // If slug doesn't pass
  if (!slug) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single blog
    const blog = await Blog.findOne({
      slug,
    }).select("-thumbnailId");

    // If blog doesn't exist
    if (!blog) {
      throw Error;
    }

    return blog;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_BLOG]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
