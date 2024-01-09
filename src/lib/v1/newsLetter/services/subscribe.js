const { NewsLetter } = require("../../../../models");
const { errors } = require("../../../../errors");

const subscribe = async ({ email }) => {
  if (!email) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // If Subscriber already exist
    const isSubscriberExist = await NewsLetter.findOne({ email });
    if (isSubscriberExist) {
      throw new errors.BadRequestError(`Subscriber Already Exists`);
    }

    // Create Subscription for Newsletter
    const subscribeNewsLetter = new NewsLetter({ email });
    await subscribeNewsLetter.save();

    // If subscribeNewsLetter Doesn't Create
    if (!subscribeNewsLetter) {
      throw Error;
    }

    // If subscribe the news letter successfully done, retrun a create code
    return { createCode: 201 };
  } catch (err) {
    if (err.message) {
      console.log(`[SUBSCRIBE]: ${err.message}`);
    }

    // If error is instance of BadRequestError
    if (err instanceof errors.BadRequestError) {
      throw new errors.BadRequestError(err.message);
    }

    throw new errors.InternalServerError(
      `News Letter Subscrption Process Failed`
    );
  }
};

module.exports = { subscribe };
