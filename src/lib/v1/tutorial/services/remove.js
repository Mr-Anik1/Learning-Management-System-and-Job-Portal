const { errors } = require("../../../../errors");
const { Tutorial } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete tutorial
    const tutorial = await Tutorial.findByIdAndDelete(id);

    // If tutorial doesn't exist
    if (!tutorial) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the tutorial is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_TUTORIAL]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Tutorial Deletion Failed");
  }
};

module.exports = { remove };
