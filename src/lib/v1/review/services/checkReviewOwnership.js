const { Review } = require("../../../../models");
const { errors } = require("../../../../errors");

const checkReviewOwnership = async ({ resourceId, userId, role }) => {
  try {
    /**
     * @If_user_is_a_admin
     */
    if (role === "admin") {
      return true;
    }

    /**
     * @If_user_is_not_admin
     */
    // Find review by id
    const review = await Review.findById(resourceId);

    // If review is doesn't exist
    if (!review) {
      throw Error;
    }

    // If the user that is inside the review matches the requested userId(Bearer)
    if (review.user.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_REVIEW_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Resource doesn't exist`);
  }
};

module.exports = { checkReviewOwnership };
