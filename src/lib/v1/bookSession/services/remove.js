const { errors } = require("../../../../errors");
const { BookSession } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const remove = async ({ bookSessionId }) => {
  // If bookSessionId doesn't pass then throw a BadRequestError
  if (!bookSessionId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // First check BookSessionID is a valid mongodb Id or not
  isValidObjectId({ id: bookSessionId, nameOfId: "Book-a-Session ID" });

  try {
    // Delete bookSession
    const bookSession = await BookSession.findByIdAndDelete(bookSessionId);

    // If bookSession doesn't exist
    if (!bookSession) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the bookSession is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_BOOK-SESSION]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Book-A-Session Deletion Failed");
  }
};

module.exports = { remove };
