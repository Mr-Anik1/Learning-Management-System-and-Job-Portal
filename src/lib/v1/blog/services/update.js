const { Blog } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, thumbnailFilePath, payload = {} }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate updateQuery Object for update a blog
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  // Update Thumbnail Image
  if (thumbnailFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find Blog
    const singleBlog=await Blog.findById(id);

    // If singleBlog doesn't exist
    if(!singleBlog){
        // Throw Not Found Error
    }

    // If thumbnailId is exist in the singleBlog
    if(singleBlog.thumbnailId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(thumbnailFilePath);

    if(uploadResult){
      updateQuery.thumbnail=uploadResult.secure_url, //cloudinary image url
      updateQuery.thumbnailId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Update Blog
    const blog = await Blog.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    }).select("-thumbnailId");

    // If blog doesn't exist
    if (!blog) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return blog;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_BLOG]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Blog Update Failed");
  }
};

module.exports = { update };
