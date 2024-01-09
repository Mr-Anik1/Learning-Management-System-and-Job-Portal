const { errors } = require("../../../../errors");
const { Video } = require("../../../../models");

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
     * const isExistVideo=await Video.findById(id)
     * 
     * // If isExistVideo doesn't exist
       if (!isExistVideo) {
        throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
       }
     *
     * If(isExistVideo.thumbnailId){
     *   destroy previous cloudinary image
     * }
     *
     *
     * |------------------------------------||
     */

    // Delete single video
    const singleVideo = await Video.findByIdAndDelete(id);

    // If singleVideo doesn't exist
    if (!singleVideo) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If the singleVideo is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_VIDEO]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Video Deletion Failed");
  }
};

module.exports = { remove };
