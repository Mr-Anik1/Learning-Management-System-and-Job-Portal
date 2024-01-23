const { errors } = require("../../../../errors");
const { ProjectCategory } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const remove = async ({ projectCategoryId }) => {
  // If projectCategoryId doesn't pass then throw a BadRequestError
  if (!projectCategoryId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check projectCategoryId is valid mongodb Id or not
  isValidObjectId({ id: projectCategoryId, nameOfId: "Project-Category ID" });

  try {
    // Delete project category
    const projectCategory = await ProjectCategory.findByIdAndDelete(
      projectCategoryId
    );

    // If projectCategory doesn't exist
    if (!projectCategory) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the projectCategory is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_PROJECT_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Project Category Deletion Failed");
  }
};

module.exports = { remove };
