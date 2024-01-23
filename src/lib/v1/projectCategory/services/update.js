const { ProjectCategory } = require("../../../../models");
const { isValidObjectId } = require("../../../../utils");
const { errors } = require("../../../../errors");

const update = async ({ projectCategoryId, title, slug }) => {
  // If projectCategoryId doesn't pass then throw BadRequestError
  if (!projectCategoryId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check projectCategoryId is valid mongodb Id or not
  isValidObjectId({ id: projectCategoryId, nameOfId: "Project-Category ID" });

  // Generate update query for project category update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  try {
    // Update project category
    const projectCategory = await ProjectCategory.findOneAndUpdate(
      { _id: projectCategoryId },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If projectCategory doesn't exist
    if (!projectCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return projectCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_PROJECT_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Project Category Update Failed");
  }
};

module.exports = { update };
