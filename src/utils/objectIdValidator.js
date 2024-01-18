const { isValid } = require("mongoose");
const { errors } = require("../errors");

const isValidObjectId = ({ id, nameOfId }) => {
  try {
    // Initial isValid check for common cases
    if (!isValid(id)) {
      throw Error;
    }

    // Additional check for 24-character strings
    if (id.toString().length !== 24) {
      throw Error;
    }

    return true;
  } catch (err) {
    if (err.message) {
      console.log(`[OBJECT_ID_VALIDATOR]: ${err.message}`);
    }

    throw new errors.BadRequestError(`${nameOfId} is Not Valid`);
  }
};

module.exports = { isValidObjectId };
