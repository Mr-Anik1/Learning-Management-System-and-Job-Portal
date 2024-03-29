const { DocumentationCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title, slug }) => {
  // If title or slug doesn't exist
  if (!title || !slug) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new documentationCategory
    const documentationCategory = new DocumentationCategory({
      title,
      slug,
    });
    await documentationCategory.save();

    // If new documentationCategory doesn't create
    if (!documentationCategory) {
      throw Error;
    }

    return documentationCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_DOCUMENTATION_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(
      `Documentation Category Creation Failed`
    );
  }
};

module.exports = { create };
