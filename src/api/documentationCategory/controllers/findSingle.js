const asyncHandler = require("express-async-handler");
const {
  documentationCategoryServicesV1,
} = require("../../../lib/v1/documentationCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Documentation Category
  const documentationCategory =
    await documentationCategoryServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Documentation Category Retrived Successfully",
    data: documentationCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
