const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { documentationServicesV1 } = require("../../../lib/v1/documentation");

const update = asyncHandler(async (req, res) => {
  // ID from request params
  const id = req.params?.id;

  // Documentation Image
  const docImageFilePath = req.file?.path;

  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title, type, author, content, keywords } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  /**
   * @Generate_paylod
   */
  const payload = {
    title,
    slug,
    type,
    author,
    content,
    keywords,
  };

  /**
   * @Update_documentation
   */
  const documentation = await documentationServicesV1.update({
    id,
    docImageFilePath,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Documentation Updated Successfully`,
    data: documentation,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
