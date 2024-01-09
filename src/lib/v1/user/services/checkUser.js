const { User } = require("../../../../models");
const { errors } = require("../../../../errors");

// Find user by email
const findUserByEmail = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    return user ? user : false;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_USER_BY_EMAIL]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
  }
};

// Find user by id
const findUserById = async ({ id }) => {
  try {
    const user = await User.findById(id);
    return user ? user : false;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_USER_BY_ID]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
  }
};

/**
 *
 *@User_Exist_or_Not
 *
 */
const userExist = async ({ email = undefined, id = undefined }) => {
  // Check with email
  if (email) {
    const user = await findUserByEmail({ email });
    return user ? true : false;
  }

  // Check with id
  if (id) {
    const user = await findUserById({ id });
    return user ? true : false;
  }
};

module.exports = { findUserByEmail, findUserById, userExist };
