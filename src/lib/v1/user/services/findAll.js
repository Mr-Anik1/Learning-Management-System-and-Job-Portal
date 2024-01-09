const { User } = require("../../../../models");
const defaults = require("../../../../config/defaults");
const { errors } = require("../../../../errors");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  status = defaults.status,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      profession: { $regex: search, $options: "i" },
      status: { $regex: status, $options: "i" },
    };

    // Find all users
    const users = await User.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .select(
        "-password -profilePictureId -passwordResetExpires -passwordResetToken"
      );

    // If the array of users doesn't exist or is empty
    if (!users || users.length === 0) {
      throw Error;
    }

    // Return the array of users
    return users;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_USERS]: ${err.message}`);
    }

    throw new errors.InternalServerError(
      `Something went wrong. Your requested resource is empty or doesn't exist`
    );
  }
};

module.exports = { findAll };
