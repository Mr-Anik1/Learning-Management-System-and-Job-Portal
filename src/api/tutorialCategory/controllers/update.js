const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  tutorialCategoryServicesV1,
} = require("../../../lib/v1/tutorialCategory");

const update = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { title } = req.body;
  let slug = undefined;
  if (title) {
    slug = slugify(title.toLowerCase());
  }
  // Tutorial Image
  const imageFilePath = req.file?.path;

  // Update Tutorial Category
  const tutorialCategory = await tutorialCategoryServicesV1.update({
    id,
    title,
    slug,
    imageFilePath,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Tutorial Category Updated Successfully`,
    data: tutorialCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
