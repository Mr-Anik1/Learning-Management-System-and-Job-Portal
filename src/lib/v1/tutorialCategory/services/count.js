const { TutorialCategory } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({ search = defaults.search }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  // How many this type of item exist in the DataBase
  const totalItems = await TutorialCategory.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
