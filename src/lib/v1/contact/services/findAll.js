const { Contact } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  status = defaults.status,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      subject: { $regex: search, $options: "i" },
      status: { $regex: status, $options: "i" },
    };

    // Find all contacts
    const contacts = await Contact.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of contacts doesn't exist or is empty
    if (!contacts || contacts.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of contacts
    return contacts;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_CONTACTS]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
