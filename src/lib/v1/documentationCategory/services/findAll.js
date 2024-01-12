const { DocumentationCategory } = require("../../../../models");
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
      title: { $regex: search, $options: "i" },
    };

    // Find all documentation category
    const documentationCategories = await DocumentationCategory.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of documentationCategories doesn't exist or is empty
    if (!documentationCategories || documentationCategories.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of documentationCategories
    return documentationCategories;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_DOCUMENTATION_CATEGORIES]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
