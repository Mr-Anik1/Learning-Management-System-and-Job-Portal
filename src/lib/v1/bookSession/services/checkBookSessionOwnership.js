const { BookSession } = require("../../../../models");
const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");

const checkBookSessionOwnership = async ({ resourceId, userId, role }) => {
  // First check BookSession is valid mongodb Id or not
  isValidObjectId({ id: resourceId, nameOfId: "Book-a-Session ID" });

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
    // Find a bookSession by it's Id
    const bookSession = await BookSession.findById(resourceId);

    // If bookSession is doesn't exist
    if (!bookSession) {
      throw Error;
    }

    // If the user that is inside the bookSession matches the requested userId(Bearer)
    if (bookSession.user.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_BOOK-SESSION_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Resource doesn't exist`);
  }
};

module.exports = { checkBookSessionOwnership };
