const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");
const { default: slugify } = require("slugify");

const create = asyncHandler(async (req, res) => {
  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // Create blog category
  const blogCategory = await blogCategoryServicesV1.create({
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Blog Category Created Successfully`,
    data: blogCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
