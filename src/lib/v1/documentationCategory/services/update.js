const { DocumentationCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, title, slug }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate update query for documentation category update
  const updateQuery = {};

  if (title) {
    updateQuery.title = title;
  }

  if (slug) {
    updateQuery.slug = slug;
  }

  try {
    // Update documentation category
    const documentationCategory = await DocumentationCategory.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If documentationCategory doesn't exist
    if (!documentationCategory) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return documentationCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_DOCUMENTATION_CATEGORY]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(
      "Documentation Category Update Failed"
    );
  }
};

module.exports = { update };
