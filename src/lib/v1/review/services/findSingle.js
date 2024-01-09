const { errors } = require("../../../../errors");
const { Review } = require("../../../../models");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single Review
    const review = await Review.findById(id).populate({
      path: "user",
      select: "_id firstname lastname profilePicture email profession role",
    });

    // If review doesn't exist
    if (!review) {
      throw Error;
    }

    return review;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_REVIEW]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
