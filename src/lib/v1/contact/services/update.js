const { Contact } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, status }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate Update Query for contact update
  const updateQuery = {};
  if (status) {
    updateQuery.status = status;
  }

  try {
    // Update Contact
    const contact = await Contact.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    });

    // If contact doesn't exist
    if (!contact) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return contact;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_CONTACT]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Contact Form Update Failed");
  }
};

module.exports = { update };
