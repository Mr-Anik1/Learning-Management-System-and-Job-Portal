const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  projectCategoryServicesV1,
} = require("../../../lib/v1/projectCategory");
const { default: slugify } = require("slugify");

const update = asyncHandler(async (req, res) => {
  // projectCategoryId from request params.
  const { projectCategoryId } = req.params;

  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // Update project category
  const projectCategory = await projectCategoryServicesV1.update({
    projectCategoryId,
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Project Category Updated Successfully`,
    data: projectCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
