const { StatusCodes } = require("http-status-codes");
const { errors } = require("../../../../errors");
const { User } = require("../../../../models");

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
     * const user=User.findById()
     *
     * If(user.profilePictureId){
     *   destroy previous cloudinary image
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete user
    const user = await User.findByIdAndDelete(id);

    // If user doesn't exist
    if (!user) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the user is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_USER]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("User Deletion Failed");
  }
};

module.exports = { remove };
