const { Documentation } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and category doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single Documentation
    const documentation = await Documentation.findOne({
      slug,
      categorySlug: categoryType,
    }).select("-docImageId");

    // Find simillar documentation topic with categorySlug
    const documentationTopic = await Documentation.find({
      categorySlug: categoryType,
    }).select("title slug categorySlug author");

    // If documentation doesn't exist
    if (!documentation) {
      throw Error;
    }

    return { documentation, documentationTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_DOCUMENTATION]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
