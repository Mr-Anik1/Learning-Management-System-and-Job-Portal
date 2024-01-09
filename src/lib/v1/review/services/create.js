const { Review } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ userId, comment, color }) => {
  if (!userId || !comment || !color) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create a review
    const review = new Review({
      user: userId,
      comment,
      color,
    });
    await review.save();

    // If review doesn't create
    if (!review) {
      throw Error;
    }

    return review;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_REVIEW]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Review Creation Failed`);
  }
};

module.exports = { create };
