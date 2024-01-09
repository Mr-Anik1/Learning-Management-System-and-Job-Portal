const { errors } = require("../../../../errors");
const { TutorialCategory } = require("../../../../models");

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
     * const singleTutorialCategory=await TutorialCategory.findById()
     *
     * // If imageId exist in the singleTutorialCategory
     * If(singleTutorialCategory.imageId){
     *   destroy previous cloudinary image
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete TutorialCategory
    const tutorialCategory = await TutorialCategory.findByIdAndDelete(id);

    // If tutorialCategory doesn't exist
    if (!tutorialCategory) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the tutorialCategory is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_TUTORIAL_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Tutorial Category Deletion Failed");
  }
};

module.exports = { remove };
