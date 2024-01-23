const { errors } = require("../../../../errors");
const { Project } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const findSingleForAdmin = async ({ projectId }) => {
  // If projectId doesn't pass
  if (!projectId) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  // Check projectId is valid mongodb Id or not
  isValidObjectId({ id: projectId, nameOfId: "Project ID" });

  try {
    // Find a single project with its ID
    const project = await Project.findById(projectId);

    // If project doesn't exist
    if (!project) {
      throw Error;
    }

    return project;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_PROJECT_FOR_ADMIN]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingleForAdmin };
