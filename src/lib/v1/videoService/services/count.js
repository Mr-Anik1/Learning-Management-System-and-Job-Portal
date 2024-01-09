const { Video } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({ search = defaults.search }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await Video.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
