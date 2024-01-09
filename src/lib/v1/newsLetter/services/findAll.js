const { NewsLetter } = require("../../../../models");
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

    // Generate filtering
    const filter = {
      email: { $regex: search, $options: "i" },
    };

    // Find all newsLetterSubscribers
    const newsLetterSubscribers = await NewsLetter.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of newsLetterSubscribers doesn't exist or is empty
    if (!newsLetterSubscribers || newsLetterSubscribers.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of newsLetterSubscribers
    return newsLetterSubscribers;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_NEWS_LETTER]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
