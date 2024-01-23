const { ProjectCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title, slug }) => {
  // If title or slug doesn't exist
  if (!title || !slug) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new projectCategory
    const projectCategory = new ProjectCategory({
      title,
      slug,
    });
    await projectCategory.save();

    // If new projectCategory doesn't create
    if (!projectCategory) {
      throw Error;
    }

    return projectCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_PROJECT_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Project Category Creation Failed`);
  }
};

module.exports = { create };
