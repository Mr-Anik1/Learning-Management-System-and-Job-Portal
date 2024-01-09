const { Review } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering ~ Only approved reviews show here
    const filter = {
      comment: { $regex: search, $options: "i" },
      status: "approved",
    };

    // Find all Reviews for anyone in the internet
    const reviews = await Review.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .populate({
        path: "user",
        select: "_id firstname lastname profilePicture email profession role",
      });

    // If the array of reviews doesn't exist or is empty
    if (!reviews || reviews.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of reviews
    return reviews;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_REVIEWS]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
