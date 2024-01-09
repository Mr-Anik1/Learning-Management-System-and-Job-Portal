const { NewsLetter } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({ search = defaults.search }) => {
  const filter = {
    email: { $regex: search, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await NewsLetter.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
