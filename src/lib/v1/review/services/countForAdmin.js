const { Review } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const countForAdmin = async ({
  search = defaults.search,
  status = defaults.status,
}) => {
  const filter = {
    comment: { $regex: search, $options: "i" },
    status: { $regex: status, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await Review.countDocuments(filter);

  return totalItems;
};

module.exports = { countForAdmin };
