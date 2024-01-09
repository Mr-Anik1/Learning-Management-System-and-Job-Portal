const { Review } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({ search = defaults.search }) => {
  const filter = {
    comment: { $regex: search, $options: "i" },
    status: "approved",
  };

  // How many of these types of items exist in the database
  const totalItems = await Review.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
