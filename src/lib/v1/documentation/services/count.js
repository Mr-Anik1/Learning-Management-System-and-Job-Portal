const { Documentation } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({
  search = defaults.search,
  category = defaults.category,
}) => {
  const filter = {
    title: { $regex: search, $options: "i" },
    category: { $regex: category, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await Documentation.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
