const { errors } = require("../../../../errors");
const { DocumentationCategory } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete documentation category
    const documentationCategory = await DocumentationCategory.findByIdAndDelete(
      id
    );

    // If documentationCategory doesn't exist
    if (!documentationCategory) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the documentationCategory is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_DOCUMENTATION_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(
      "Documentation Category Deletion Failed"
    );
  }
};

module.exports = { remove };
