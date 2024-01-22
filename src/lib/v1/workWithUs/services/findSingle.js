const { errors } = require("../../../../errors");
const { WorkWithUs } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check work-with-us ID is valid mongodb ID or not
  isValidObjectId({ id: id, nameOfId: "Work-With-US ID" });

  try {
    // Find Single Work-With-US form
    const workWithUs = await WorkWithUs.findById(id);

    // If workWithUs doesn't exist
    if (!workWithUs) {
      throw Error;
    }

    return workWithUs;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_Work-With-US]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
