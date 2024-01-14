const { Video } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and categoryType doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single video
    const singleVideo = await Video.findOne({
      slug,
      categorySlug: categoryType,
    }).select("-thumbnailId");

    // Find simillar video topic with categorySlug
    const videoTopic = await Video.find({ categorySlug: categoryType }).select(
      "title slug categorySlug"
    );

    // If singleVideo doesn't exist
    if (!singleVideo) {
      throw Error;
    }

    return { singleVideo, videoTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_VIDEO]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
