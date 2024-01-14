const { VideoCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, title, slug }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate update query for video category update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  try {
    // Update video category
    const videoCategory = await VideoCategory.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If videoCategory doesn't exist
    if (!videoCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return videoCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_VIDEO_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Video Category Update Failed");
  }
};

module.exports = { update };
