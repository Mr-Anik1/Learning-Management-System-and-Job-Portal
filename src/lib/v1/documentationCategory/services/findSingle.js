const { DocumentationCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single documentation category
    const documentationCategory = await DocumentationCategory.findById(id);

    // If documentationCategory doesn't exist
    if (!documentationCategory) {
      throw Error;
    }

    return documentationCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_DOCUMENTATION_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
