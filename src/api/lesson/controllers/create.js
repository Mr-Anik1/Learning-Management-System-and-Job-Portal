const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { lessonServicesV1 } = require("../../../lib/v1/lesson");

const create = asyncHandler(async (req, res) => {
  // Course ID from request params
  const { courseId } = req.params;

  // Instructor ID
  const instructor = req.user?.userId;

  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const { title, category } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Create_a_lesson
   */
  const lesson = await lessonServicesV1.create({
    courseId,
    title,
    slug,
    category,
    categorySlug,
    instructor,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Lesson created successfully and added to the course.`,
    data: lesson,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
