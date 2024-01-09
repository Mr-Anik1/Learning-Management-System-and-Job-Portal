const { errors } = require("../../../../errors");
const { User } = require("../../../../models");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find single user
    const user = await User.findById(id).select(
      "-password -profilePictureId -passwordResetExpires -passwordResetToken"
    );

    // If user doesn't exist
    if (!user) {
      throw Error;
    }

    return user;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_USER]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
