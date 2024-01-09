const { TutorialCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single Tutorial Category
    const tutorialCategory = await TutorialCategory.findById(id).select(
      "-imageId"
    );

    // If tutorialCategory doesn't exist
    if (!tutorialCategory) {
      throw Error;
    }

    return tutorialCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_TUTORIAL_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
