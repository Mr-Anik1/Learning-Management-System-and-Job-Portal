const { errors } = require("../../../../errors");
const { WorkWithUs } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check work-with-us ID is valid mongodb ID or not
  isValidObjectId({ id: id, nameOfId: "Work-With-US ID" });

  try {
    // Delete a Work-With-US form
    const workWithUs = await WorkWithUs.findByIdAndDelete(id);

    // If workWithUs doesn't exist
    if (!workWithUs) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the workWithUs is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_Work-With-US]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Work-With-US Form Deletion Failed");
  }
};

module.exports = { remove };
