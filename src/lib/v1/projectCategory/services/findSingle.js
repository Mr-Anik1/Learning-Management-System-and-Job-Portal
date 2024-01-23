const { ProjectCategory } = require("../../../../models");
const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");

const findSingle = async ({ projectCategoryId }) => {
  // If projectCategoryId doesn't pass then throw BadRequestError
  if (!projectCategoryId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check projectCategoryId is valid mongodb Id or not
  isValidObjectId({ id: projectCategoryId, nameOfId: "Project-Category ID" });

  try {
    // Find Single project category
    const projectCategory = await ProjectCategory.findById(projectCategoryId);

    // If projectCategory doesn't exist
    if (!projectCategory) {
      throw Error;
    }

    return projectCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_PROJECT_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
