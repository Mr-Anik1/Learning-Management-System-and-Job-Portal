const { Blog } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  category,
  categorySlug,
  thumbnailFilePath,
  description,
  keywords,
}) => {
  // If required filds doesn't exists
  if (
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !description ||
    !keywords
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for post/create a new blog
  const createQuery = {
    title,
    slug,
    category,
    categorySlug,
    description,
    keywords,
  };

  // Upload Image
  if (thumbnailFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(thumbnailFilePath);

    if(uploadResult){
      createQuery.thumbnail=uploadResult.secure_url, //cloudinary image url
      createQuery.thumbnailId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Post/Create a new blog
    const blog = new Blog(createQuery);
    await blog.save();

    // If blog doesn't create
    if (!blog) {
      throw Error;
    }

    return blog;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_BLOG]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Blog Posted Failed`);
  }
};

module.exports = { create };
