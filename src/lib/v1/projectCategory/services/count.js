const { ProjectCategory } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({ search = defaults.search }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  // How many this type of item exist in the DataBase
  const totalItems = await ProjectCategory.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
