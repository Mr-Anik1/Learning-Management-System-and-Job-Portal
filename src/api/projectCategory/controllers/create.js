const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  projectCategoryServicesV1,
} = require("../../../lib/v1/projectCategory");
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

  // Create project category
  const projectCategory = await projectCategoryServicesV1.create({
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Project Category Created Successfully`,
    data: projectCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
