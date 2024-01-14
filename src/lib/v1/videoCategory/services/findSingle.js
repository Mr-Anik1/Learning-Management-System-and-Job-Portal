const { VideoCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single video category
    const videoCategory = await VideoCategory.findById(id);

    // If videoCategory doesn't exist
    if (!videoCategory) {
      throw Error;
    }

    return videoCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_VIDEO_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
