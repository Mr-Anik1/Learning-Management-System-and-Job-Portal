const { errors } = require("../../../../errors");
const { VideoCategory } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete video category
    const videoCategory = await VideoCategory.findByIdAndDelete(id);

    // If videoCategory doesn't exist
    if (!videoCategory) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the videoCategory is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_VIDEO_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Video Category Deletion Failed");
  }
};

module.exports = { remove };
