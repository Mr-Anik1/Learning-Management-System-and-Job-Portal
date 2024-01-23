const { errors } = require("../../../../errors");
const { Project } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");

const update = async ({ projectId, superUser, status, payload = {} }) => {
  // If projectId doesn't pass then throw BadRequestError
  if (!projectId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check projectId is valid mongodb Id or not
  isValidObjectId({ id: projectId, nameOfId: "Project ID" });

  // Generate updateQuery Object for update a blog
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  /**
   * @Update_Images
   *
   *||------------------------------------||
   *
   *         LATER NEED SOME WORK
   *  FOR CLOUDINARY MULTIPLE IMAGE UPLOAD
   *
   * |------------------------------------||
   *
   */

  /**
   * @Only_admin_can_update_sensitive_data
   */
  if (superUser === "admin") {
    // Update project status
    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update project
    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If project doesn't exist
    if (!project) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return project;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_PROJECT]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Project Update Failed");
  }
};

module.exports = { update };
