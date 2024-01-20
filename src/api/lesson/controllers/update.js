const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { lessonServicesV1 } = require("../../../lib/v1/lesson");

const update = asyncHandler(async (req, res) => {
  // lessonId from request params
  const lessonId = req.params?.lessonId;

  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const { title, category, content, video, freePreview } = req.body;

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
    content,
    video,
    freePreview,
  };

  /**
   * @Update_lesson
   */
  const lesson = await lessonServicesV1.update({
    lessonId,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Lesson Updated Successfully`,
    data: lesson,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
