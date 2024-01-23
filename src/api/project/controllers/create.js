const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { projectServicesV1 } = require("../../../lib/v1/project");

const create = asyncHandler(async (req, res) => {
  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const { title, category, description, author } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Post_a_project
   */
  const project = await projectServicesV1.create({
    title,
    slug,
    category,
    categorySlug,
    description,
    author,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Project Created Successfully`,
    data: project,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
