const { Documentation } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  category,
  categorySlug,
  type,
  author,
  content,
  docImageFilePath,
  keywords,
}) => {
  // If required filds doesn't exists
  if (
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !type ||
    !author ||
    !content ||
    !keywords
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for post/create a new documentation
  const createQuery = {
    title,
    slug,
    category,
    categorySlug,
    type,
    author,
    content,
    keywords,
  };

  // Upload Image
  if (docImageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(docImageFilePath);

    if(uploadResult){
      createQuery.docImage=uploadResult.secure_url, //cloudinary image url
      createQuery.docImageId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Create/Post a new documentation
    const documentation = new Documentation(createQuery);
    await documentation.save();

    // If documentation doesn't create
    if (!documentation) {
      throw Error;
    }

    return documentation;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_DOCUMENTATION]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Documentation Posted Failed`);
  }
};

module.exports = { create };
