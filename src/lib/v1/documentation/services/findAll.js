const { Documentation } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  category = defaults.category,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      title: { $regex: search, $options: "i" },
      category: { $regex: category, $options: "i" },
    };

    // Find all Documentations
    const documentations = await Documentation.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .select("-docImageId");

    // If the array of documentations doesn't exist or is empty
    if (!documentations || documentations.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of documentations
    return documentations;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_DOCUMENTATIONS]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
