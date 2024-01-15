const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { courseCategoryServicesV1 } = require("../../../lib/v1/courseCategory");
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

  // Create course category
  const courseCategory = await courseCategoryServicesV1.create({
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Course Category Created Successfully`,
    data: courseCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
