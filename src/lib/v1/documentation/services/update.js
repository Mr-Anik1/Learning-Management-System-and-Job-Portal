const { Documentation } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({ id, docImageFilePath, payload = {} }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate updateQuery Object for update a documentation
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  // Update docImage
  if (docImageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find Documentation
    const documentation=await Documentation.findById(id);

    // If documentation doesn't exist
    if(!documentation){
        // Throw Not Found Error
    }

    // If docImageId is exist in the documentation
    if(documentation.docImageId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(docImageFilePath);

    if(uploadResult){
      updateQuery.docImage=uploadResult.secure_url, //cloudinary image url
      updateQuery.docImageId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Update Documentation
    const documentation = await Documentation.findOneAndUpdate(
      { _id: id },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    ).select("-docImageId");

    // If documentation doesn't exist
    if (!documentation) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return documentation;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_DOCUMENTATION]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Documentation Update Failed");
  }
};

module.exports = { update };
