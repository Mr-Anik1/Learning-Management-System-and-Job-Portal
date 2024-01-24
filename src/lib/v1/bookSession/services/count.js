const { BookSession } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const count = async ({
  search = defaults.search,
  status = defaults.status,
}) => {
  const filter = {
    subject: { $regex: search, $options: "i" },
    status: { $regex: status, $options: "i" },
  };

  // How many of these types of items exist in the database
  const totalItems = await BookSession.countDocuments(filter);

  return totalItems;
};

module.exports = { count };
