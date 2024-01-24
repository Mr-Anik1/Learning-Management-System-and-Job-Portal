const { BookSession } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ userId, subject, description, timeslot }) => {
  if (!userId || !subject || !description || !timeslot) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create a bookSession
    const bookSession = new BookSession({
      user: userId,
      subject,
      description,
      timeslot,
    });
    await bookSession.save();

    // If bookSession doesn't create
    if (!bookSession) {
      throw Error;
    }

    return bookSession;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_BOOK-SESSION]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Book-A-Session Creation Failed`);
  }
};

module.exports = { create };
