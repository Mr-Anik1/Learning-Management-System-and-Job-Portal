const { Tutorial } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, payload = {} }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Dynamically check which fields are valid and set them into updateQuery.
  const updateQuery = {};
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  try {
    // Update Tutorial
    const tutorial = await Tutorial.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    });

    // If tutorial doesn't exist
    if (!tutorial) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return tutorial;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_TUTORIAL]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Tutorial Update Failed");
  }
};

module.exports = { update };
