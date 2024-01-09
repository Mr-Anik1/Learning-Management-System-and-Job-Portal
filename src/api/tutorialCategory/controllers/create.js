const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  tutorialCategoryServicesV1,
} = require("../../../lib/v1/tutorialCategory");

const create = asyncHandler(async (req, res) => {
  const { title } = req.body;
  let slug = undefined;
  if (title) {
    slug = slugify(title.toLowerCase());
  }
  // Tutorial Image
  const imageFilePath = req.file?.path;

  // Create Tutorial Category
  const createTutorialCategory = await tutorialCategoryServicesV1.create({
    title,
    slug,
    imageFilePath,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Tutorial Category Created Successfully`,
    data: createTutorialCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
