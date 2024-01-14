const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogServicesV1 } = require("../../../lib/v1/blog");

const update = asyncHandler(async (req, res) => {
  // ID from request params
  const id = req.params?.id;

  // Blog thumbnail image
  const thumbnailFilePath = req.file?.path;

  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const { title, category, description, keywords } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Generate_paylod
   */
  const payload = {
    title,
    slug,
    category,
    categorySlug,
    description,
    keywords,
  };

  /**
   * @Update_Blog
   */
  const blog = await blogServicesV1.update({
    id,
    thumbnailFilePath,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Blog Updated Successfully`,
    data: blog,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
