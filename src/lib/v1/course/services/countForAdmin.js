const { Course } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const countForAdmin = async ({
  search = defaults.search,
  status = defaults.status,
  category = defaults.category,
  paid = defaults.paid,
}) => {
  const filter = {
    title: { $regex: search, $options: "i" },
    status: { $regex: status, $options: "i" },
    category: { $regex: category, $options: "i" },
    paid: { $regex: paid, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await Course.countDocuments(filter);

  return totalItems;
};

module.exports = { countForAdmin };
