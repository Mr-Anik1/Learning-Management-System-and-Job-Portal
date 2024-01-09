const { Tutorial } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, type }) => {
  try {
    // Find a Single Tutorial
    const tutorial = await Tutorial.findOne({
      slug,
      tutorialCategorySlug: type,
    });

    // Find Simillar Tutorial Topic with tutorialCategorySlug
    const tutorialTopic = await Tutorial.find({ tutorialCategorySlug: type })
      .select("topicName title slug tutorialCategorySlug")
      .sort("createdAt");

    // If tutorial doesn't exist
    if (!tutorial) {
      throw Error;
    }

    return { tutorial, tutorialTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_TUTORIAL]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
