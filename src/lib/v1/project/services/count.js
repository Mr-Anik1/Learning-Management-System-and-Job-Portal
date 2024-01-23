const { Project } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({
  search = defaults.search,
  category = defaults.category,
  author = defaults.author,
}) => {
  const filter = {
    title: { $regex: search, $options: "i" },
    category: { $regex: category, $options: "i" },
    status: "APPROVED",
    author: { $regex: author, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await Project.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
