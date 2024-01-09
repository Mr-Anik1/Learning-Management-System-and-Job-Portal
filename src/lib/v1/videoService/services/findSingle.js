const { Video } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug }) => {
  // If slug doesn't pass
  if (!slug) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single video
    const singleVideo = await Video.findOne({
      slug,
    }).select("-thumbnailId");

    // If singleVideo doesn't exist
    if (!singleVideo) {
      throw Error;
    }

    return singleVideo;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_VIDEO]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
