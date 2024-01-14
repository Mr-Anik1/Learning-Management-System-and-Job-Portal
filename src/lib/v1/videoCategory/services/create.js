const { VideoCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title, slug }) => {
  // If title or slug doesn't exist
  if (!title || !slug) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new videoCategory
    const videoCategory = new VideoCategory({
      title,
      slug,
    });
    await videoCategory.save();

    // If new videoCategory doesn't create
    if (!videoCategory) {
      throw Error;
    }

    return videoCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_VIDEO_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Video Category Creation Failed`);
  }
};

module.exports = { create };
