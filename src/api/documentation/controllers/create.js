const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { documentationServicesV1 } = require("../../../lib/v1/documentation");

const create = asyncHandler(async (req, res) => {
  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title, category, type, author, content, keywords } = req.body;

  // Documentation Image
  const docImageFilePath = req.file?.path;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  /**
   * @Post_a_documentation
   */
  const documentation = await documentationServicesV1.create({
    title,
    slug,
    category,
    type,
    author,
    content,
    docImageFilePath,
    keywords,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Documentation Posted Successfully`,
    data: documentation,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
