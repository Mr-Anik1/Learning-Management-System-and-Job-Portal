const { NewsLetter } = require("../../../../models");
const { errors } = require("../../../../errors");

const unsubscribe = async ({ email }) => {
  if (!email) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Unsubscribe the news letter
    const unsubscribeNewsLetter = await NewsLetter.findOneAndDelete({ email });

    // If doesn't exist
    if (!unsubscribeNewsLetter) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist.`);
    }

    // If unsubscribe the news letter successfully done, return a delCode
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[UN_SUBSCRIBE]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(
      `News Letter Unsubscription Process Failed.`
    );
  }
};

module.exports = { unsubscribe };
