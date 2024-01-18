const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { courseServicesV1 } = require("../../../lib/v1/course");

const update = asyncHandler(async (req, res) => {
  // ID from request params
  const id = req.params?.id;

  // User Role
  const superUser = req.user?.role;

  // Course image image
  const imageFilePath = req.file?.path;

  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const {
    title,
    category,
    description,
    price,
    status,
    paid,
    lesson, // push individual lesson
    lessons, // full lessons update
    totalHours,
    enrolls,
    rating, // later I will work it.
    ratings, // full ratings update
    totalRatings,
  } = req.body;

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
    price,
    paid,
    lessons,
    totalHours,
    enrolls,
    ratings,
    totalRatings,
  };

  /**
   * @Update_Course
   */
  const course = await courseServicesV1.update({
    id,
    superUser,
    status,
    imageFilePath,
    lesson,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Course Updated Successfully`,
    data: course,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
