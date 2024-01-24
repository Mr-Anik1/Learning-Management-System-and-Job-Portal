const { BookSession } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");
const { errors } = require("../../../../errors");

const update = async ({ bookSessionId, superUser, status, payload = {} }) => {
  // If bookSessionId doesn't pass then throw BadRequestError
  if (!bookSessionId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // First check BookSessionID is a valid mongodb Id or not
  isValidObjectId({ id: bookSessionId, nameOfId: "Book-a-Session ID" });

  // Generate Update Query for review update
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  /**
   * @Only_admin_can_update_sensitive_data
   */
  if (superUser === "admin") {
    // Update bookSession status
    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update bookSession
    const bookSession = await BookSession.findOneAndUpdate(
      { _id: bookSessionId },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "user",
      select:
        "_id firstname lastname profilePicture email mobile profession role",
    });

    // If bookSession doesn't exist
    if (!bookSession) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return bookSession;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_BOOK-SESSION]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Book-A-Session Update Failed");
  }
};

module.exports = { update };
