const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  documentationCategoryServicesV1,
} = require("../../../lib/v1/documentationCategory");

const create = asyncHandler(async (req, res) => {
  const { title } = req.body;

  // Create documentation category
  const documentationCategory = await documentationCategoryServicesV1.create({
    title,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Documentation Category Created Successfully`,
    data: documentationCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
