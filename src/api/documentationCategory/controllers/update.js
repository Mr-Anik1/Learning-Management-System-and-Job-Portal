const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  documentationCategoryServicesV1,
} = require("../../../lib/v1/documentationCategory");
const { default: slugify } = require("slugify");

const update = asyncHandler(async (req, res) => {
  // ID from request params.
  const id = req.params?.id;

  // First define slug is undefined
  let slug = undefined;

  // Filds from request body
  const { title } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // Update Documentation Category
  const documentationCategory = await documentationCategoryServicesV1.update({
    id,
    title,
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Documentation Category Updated Successfully`,
    data: documentationCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
