const { errors } = require("../../../../errors");
const { Contact } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete Contact
    const contact = await Contact.findByIdAndDelete(id);

    // If contact doesn't exist
    if (!contact) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the contact is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_CONTACT]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Contact Form Deletion Failed");
  }
};

module.exports = { remove };
