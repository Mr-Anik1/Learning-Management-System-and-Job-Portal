const { errors } = require("../../../../errors");
const { Contact } = require("../../../../models");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single Contact
    const contact = await Contact.findById(id);

    // If contact doesn't exist
    if (!contact) {
      throw Error;
    }

    return contact;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_CONTACT]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
