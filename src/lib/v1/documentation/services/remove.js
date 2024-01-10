const { errors } = require("../../../../errors");
const { Documentation } = require("../../../../models");

const remove = async ({ id }) => {
  // If id doesn't pass then throw a BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    /**
     *||------------------------------------||
     *
     *                 LATER
     *     NEED SOME WORK FOR CLOUDINARY
     *
     *
     * const isExistDocumentation=await Documentation.findById(id)
     * 
     * // If isExistDocumentation doesn't exist
       if (!isExistDocumentation) {
        throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
       }
     *
     * If(isExistDocumentation.docImageId){
     *   destroy previous cloudinary image
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete a documentation
    const documentation = await Documentation.findByIdAndDelete(id);

    // If documentation doesn't exist
    if (!documentation) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the documentation is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_DOCUMENTATION]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Documentation Deletion Failed");
  }
};

module.exports = { remove };
