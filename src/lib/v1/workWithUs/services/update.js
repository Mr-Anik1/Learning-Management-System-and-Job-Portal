const { WorkWithUs } = require("../../../../models");
const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");

const update = async ({ id, superUser, status, payload }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check work-with-us ID is valid mongodb ID or not
  isValidObjectId({ id: id, nameOfId: "Work-With-US ID" });

  // Generate Update Query for work-with-us update
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  /**
   * @Only_admin_can_update_sensitive_data
   */
  if (superUser === "admin") {
    // Update work-with-us status
    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update Work-With-US
    const workWithUs = await WorkWithUs.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If workWithUs doesn't exist
    if (!workWithUs) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return workWithUs;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_Work-With-US]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Work-With-US Form Update Failed");
  }
};

module.exports = { update };
