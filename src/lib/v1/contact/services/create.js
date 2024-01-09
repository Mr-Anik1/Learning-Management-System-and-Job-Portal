const { Contact } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  name,
  email,
  mobile,
  profession,
  subject,
  comment,
}) => {
  if (!name || !email || !mobile || !profession || !subject || !comment) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create a contact form
    const contact = new Contact({
      name,
      email,
      mobile,
      profession,
      subject,
      comment,
    });
    await contact.save();

    // If contact form doesn't create
    if (!contact) {
      throw Error;
    }

    return contact;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_CONTACT]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Contact Form Creation Failed`);
  }
};

module.exports = { create };
