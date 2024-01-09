const { User } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({
  search = defaults.search,
  status = defaults.status,
}) => {
  const filter = {
    profession: { $regex: search, $options: "i" },
    status: { $regex: status, $options: "i" },
  };

  // How many this type of item exist in the DataBase
  const totalItems = await User.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
