const { Course } = require("../../../../models");
const { errors } = require("../../../../errors");

const update = async ({
  id,
  superUser,
  status,
  imageFilePath,
  payload = {},
}) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate Update Query for course update
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  // Update Course Image
  if (imageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find Course
    const singleCourse=await Course.findById(id);

    // If singleCourse doesn't exist
    if(!singleCourse){
        // Throw Not Found Error
    }

    // If imageId is exist in the singleCourse
    if(singleCourse.imageId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFilePath);

    if(uploadResult){
      updateQuery.image=uploadResult.secure_url, //cloudinary image url
      updateQuery.imageId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  /**
   * @Only_admin_can_update_sensitive_data
   */
  if (superUser === "admin") {
    // Update course status
    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update course
    const course = await Course.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    }).select("-imageId");

    // If course doesn't exist
    if (!course) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return course;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_COURSE]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Course Update Failed");
  }
};

module.exports = { update };
