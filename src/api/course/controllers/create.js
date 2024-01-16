const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { courseServicesV1 } = require("../../../lib/v1/course");

const create = asyncHandler(async (req, res) => {
  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Instructor ID
  const instructor = req.user?.userId;

  // Filds from request body
  const { title, category, description } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Post_a_course
   */
  const course = await courseServicesV1.create({
    title,
    slug,
    category,
    categorySlug,
    description,
    instructor,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Course Posted Successfully`,
    data: course,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
