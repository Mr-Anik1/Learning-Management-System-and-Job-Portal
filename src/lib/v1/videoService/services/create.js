const { Video } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  category,
  categorySlug,
  thumbnailFilePath,
  description,
  videoUrl,
  keywords,
}) => {
  // If required filds doesn't exists
  if (
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !description ||
    !videoUrl ||
    !keywords
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for post/create a new video
  const createQuery = {
    title,
    slug,
    category,
    categorySlug,
    description,
    videoUrl,
    keywords,
  };

  // Upload Image
  if (thumbnailFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(thumbnailFilePath);

    if(uploadResult){
      createQuery.thumbnail=uploadResult.secure_url, //cloudinary image url
      createQuery.thumbnailId=uploadResult.public_id, //cloudinary image id
    }

     * 
     */
  }

  try {
    // Post/create a new video
    const postVideo = new Video(createQuery);
    await postVideo.save();

    // If postVideo doesn't create
    if (!postVideo) {
      throw Error;
    }

    return postVideo;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_VIDEO]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Video Posted Failed`);
  }
};

module.exports = { create };
