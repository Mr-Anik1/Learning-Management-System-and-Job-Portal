const { errors } = require("../../../../errors");
const { Project } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const remove = async ({ projectId }) => {
  // If projectId doesn't pass then throw a BadRequestError
  if (!projectId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check projectId is valid mongodb Id or not
  isValidObjectId({ id: projectId, nameOfId: "Project ID" });

  try {
    /**
     *||------------------------------------||
     *
     *         LATER NEED SOME WORK
     *  FOR CLOUDINARY MULTIPLE IMAGE REMOVE
     *
     * |------------------------------------||
     */

    // Delete single project
    const project = await Project.findByIdAndDelete(projectId);

    // If project doesn't exist
    if (!project) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the project is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_PROJECT]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("project Deletion Failed");
  }
};

module.exports = { remove };
