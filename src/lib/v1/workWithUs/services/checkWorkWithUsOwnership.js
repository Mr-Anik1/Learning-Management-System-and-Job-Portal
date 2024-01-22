const { errors } = require("../../../../errors");
const { WorkWithUs } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const checkWorkWithUsOwnership = async ({ resourceId, userId, role }) => {
  // Check resourceId(Work-With-US ID) is a valid mongodb id or not
  isValidObjectId({ id: resourceId, nameOfId: "Work-With-US ID" });

  try {
    /**
     * @If_user_is_a_admin
     */
    if (role === "admin") {
      return true;
    }

    /**
     * @If_user_is_not_admin
     */
    // Find Work-With-US form by its ID
    const workWithUS = await WorkWithUs.findById(resourceId);

    // If workWithUS is doesn't exist
    if (!workWithUS) {
      throw Error;
    }

    // If the applicantId that is inside the workWithUS matches the requested userId(Bearer)
    if (workWithUS.applicantId.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_Work-With-US-Form_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Your Requested Work-With-US Form Doesn't Exist`
    );
  }
};

module.exports = { checkWorkWithUsOwnership };
