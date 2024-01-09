const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { tutorialServicesV1 } = require("../../../lib/v1/tutorial");

const update = asyncHandler(async (req, res) => {
  // ID from request params
  const id = req.params?.id;

  // First define slug and tutorialCategory is undefined
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

  /**
   * @Generate_paylod
   */
  const payload = {
    title,
    slug,
    tutorialCategory,
    tutorialCategorySlug,
    topicName,
    content,
    keywords,
  };

  /**
   * @Update_Tutorial
   */
  const tutorial = await tutorialServicesV1.update({ id, payload });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Tutorial Updated Successfully`,
    data: tutorial,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
