const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { tutorialServicesV1 } = require("../../../lib/v1/tutorial");

const create = asyncHandler(async (req, res) => {
  let slug = undefined;
  let tutorialCategorySlug = undefined;
  // Filds from request body
  const { title, tutorialCategory, topicName, content, keywords } = req.body;
  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }
  // If tutorialCategory is exist, generate tutorialCategorySlug
  if (tutorialCategory) {
    tutorialCategorySlug = slugify(tutorialCategory.toLowerCase());
  }

  // Create Tutorial
  const createTutorial = await tutorialServicesV1.create({
    title,
    slug,
    tutorialCategory,
    tutorialCategorySlug,
    topicName,
    content,
    keywords,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Tutorial Created Successfully`,
    data: createTutorial,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
