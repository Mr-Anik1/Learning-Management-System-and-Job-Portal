const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { videoServicesV1 } = require("../../../lib/v1/videoService");

const update = asyncHandler(async (req, res) => {
  // ID from request params
  const id = req.params?.id;

  // Video thumbnail image
  const thumbnailFilePath = req.file?.path;

  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title, description, videoUrl, keywords } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  /**
   * @Generate_paylod
   */
  const payload = {
    title,
    slug,
    description,
    videoUrl,
    keywords,
  };

  /**
   * @Update_Video
   */
  const updateVideo = await videoServicesV1.update({
    id,
    thumbnailFilePath,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Video Updated Successfully`,
    data: updateVideo,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
