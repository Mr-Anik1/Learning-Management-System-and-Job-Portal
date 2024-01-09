const { Review } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, superUser, comment, color, status }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate Update Query for review update
  const updateQuery = {};

  // General users can update non-sensitive data
  if (comment) {
    updateQuery.comment = comment;
  }

  if (color) {
    updateQuery.color = color;
  }

  /**
   * @Only_admin_can_update_sensitive_data
   */
  if (superUser === "admin") {
    updateQuery.status = status;
  }

  try {
    // Update Review
    const review = await Review.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    });

    // If review doesn't exist
    if (!review) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return review;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_REVIEW]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Review Update Failed");
  }
};

module.exports = { update };
