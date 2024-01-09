const { TutorialCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title, slug, imageFilePath }) => {
  // If title or slug doesn't exist
  if (!title || !slug) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for create new tutorial category
  const createQuery = {
    title,
    slug,
  };

  // Upload Image
  if (imageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFilePath);

    createQuery.image=uploadResult.secure_url, //cloudinary image url
    createQuery.imageId=uploadResult.public_id, //cloudinary image id

     * 
     */
  }

  try {
    // Create new tutorial category
    const createTutorialCategory = new TutorialCategory(createQuery);
    await createTutorialCategory.save();

    // If new tutorial category doesn't create
    if (!createTutorialCategory) {
      throw Error;
    }

    return createTutorialCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_TUTORIAL_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Tutorial Category Creation Failed`);
  }
};

module.exports = { create };
