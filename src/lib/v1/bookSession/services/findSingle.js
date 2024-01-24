const { errors } = require("../../../../errors");
const { BookSession } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const findSingle = async ({ bookSessionId }) => {
  // If bookSessionId doesn't pass then throw BadRequestError
  if (!bookSessionId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // First check BookSessionID is a valid mongodb Id or not
  isValidObjectId({ id: bookSessionId, nameOfId: "Book-a-Session ID" });

  try {
    // Find Single bookSession
    const bookSession = await BookSession.findById(bookSessionId).populate({
      path: "user",
      select:
        "_id firstname lastname profilePicture email mobile profession role",
    });

    // If bookSession doesn't exist
    if (!bookSession) {
      throw Error;
    }

    return bookSession;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_BOOK-SESSION]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
