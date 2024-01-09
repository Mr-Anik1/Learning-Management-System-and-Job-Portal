const { Video } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, thumbnailFilePath, payload = {} }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate updateQuery Object for update a video
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  // Update Thumbnail Image
  if (thumbnailFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find Video
    const singleVideo=await Video.findById(id);

    // If singleVideo doesn't exist
    if(!singleVideo){
        // Throw Not Found Error
    }

    // If thumbnailId is exist in the singleVideo
    if(singleVideo.thumbnailId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(thumbnailFilePath);

    if(uploadResult){
      updateQuery.thumbnail=uploadResult.secure_url, //cloudinary image url
      updateQuery.thumbnailId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Update Video
    const updateVideo = await Video.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    }).select("-thumbnailId");

    // If updateVideo doesn't exist
    if (!updateVideo) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return updateVideo;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_VIDEO]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Video Update Failed");
  }
};

module.exports = { update };
