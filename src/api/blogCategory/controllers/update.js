const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");
const { default: slugify } = require("slugify");

const update = asyncHandler(async (req, res) => {
  // ID from request params.
  const id = req.params?.id;

  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // Update Blog Category
  const blogCategory = await blogCategoryServicesV1.update({
    id,
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Blog Category Updated Successfully`,
    data: blogCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
