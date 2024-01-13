const { errors } = require("../../../../errors");
const { Blog } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
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
     * const isExistBlog=await Blog.findById(id)
     * 
     * // If isExistBlog doesn't exist
       if (!isExistBlog) {
        throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
       }
     *
     * If(isExistBlog.thumbnailId){
     *   destroy previous cloudinary image
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete single Blog
    const blog = await Blog.findByIdAndDelete(id);

    // If blog doesn't exist
    if (!blog) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the blog is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_BLOG]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Blog Deletion Failed");
  }
};

module.exports = { remove };
