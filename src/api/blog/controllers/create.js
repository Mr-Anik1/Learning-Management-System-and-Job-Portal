const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogServicesV1 } = require("../../../lib/v1/blog");

const create = asyncHandler(async (req, res) => {
  let slug = undefined;

  // Filds from request body
  const { title, category, description, keywords } = req.body;

  // Blog thumbnail image
  const thumbnailFilePath = req.file?.path;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  /**
   * @Post_a_blog
   */
  const blog = await blogServicesV1.create({
    title,
    slug,
    category,
    thumbnailFilePath,
    description,
    keywords,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Blog Posted Successfully`,
    data: blog,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
