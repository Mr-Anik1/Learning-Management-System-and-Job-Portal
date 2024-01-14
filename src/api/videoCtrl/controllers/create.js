const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { videoServicesV1 } = require("../../../lib/v1/videoService");

const create = asyncHandler(async (req, res) => {
  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const { title, category, description, videoUrl, keywords } = req.body;

  // Video thumbnail image
  const thumbnailFilePath = req.file?.path;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Post_a_video
   */
  const postVideo = await videoServicesV1.create({
    title,
    slug,
    category,
    categorySlug,
    thumbnailFilePath,
    description,
    videoUrl,
    keywords,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Video Posted Successfully`,
    data: postVideo,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
