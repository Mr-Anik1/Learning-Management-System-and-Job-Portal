const { Documentation } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug }) => {
  // If slug doesn't pass
  if (!slug) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single Documentation
    const documentation = await Documentation.findOne({
      slug,
    }).select("-docImageId");

    // If documentation doesn't exist
    if (!documentation) {
      throw Error;
    }

    return documentation;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_DOCUMENTATION]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
