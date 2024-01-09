const { TutorialCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, title, slug, imageFilePath }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate Update Query for Tutorial Category Update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  // Update Image
  if (imageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find Tutorial Category
    const tutorialCategory=await TutorialCategory.findById(id);

    // If tutorialCategory doesn't exist
    if(!tutorialCategory){
        // Throw Not Found Error
    }

    // If imageId is exist in the tutorialCategory
    if(tutorialCategory.imageId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFilePath);

    updateQuery.image=uploadResult.secure_url, //cloudinary image url
    updateQuery.imageId=uploadResult.public_id, //cloudinary image id

     * 
     */
  }

  try {
    // Update Tutorial Category
    const tutorialCategory = await TutorialCategory.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    ).select("-imageId");

    // If tutorialCategory doesn't exist
    if (!tutorialCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return tutorialCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_TUTORIAL_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Tutorial Category Update Failed");
  }
};

module.exports = { update };
