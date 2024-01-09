const { errors } = require("../../../../errors");
const { findUserById } = require("./checkUser");

const checkUserOwnership = async ({ resourceId, userId, role }) => {
  try {
    /**
     * @If_user_is_a_admin
     */
    if (role === "admin") {
      return true;
    }

    /**
     * @If_user_is_not_admin
     */
    // Find user by requested id(resourceId)
    const user = await findUserById({ id: resourceId });

    // If user doesn't exist
    if (!user) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
    }

    // If the userId(Bearer) is matches to requested user id
    if (user.id === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_USER_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { checkUserOwnership };
