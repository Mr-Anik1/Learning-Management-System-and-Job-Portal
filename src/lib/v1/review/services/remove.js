const { errors } = require("../../../../errors");
const { Review } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete Review
    const review = await Review.findByIdAndDelete(id);

    // If review doesn't exist
    if (!review) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the review is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_REVIEW]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Review Deletion Failed");
  }
};

module.exports = { remove };
