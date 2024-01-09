const asyncHandler = require("express-async-handler");
const {
  tutorialCategoryServicesV1,
} = require("../../../lib/v1/tutorialCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Tutorial Category
  const tutorialCategory = await tutorialCategoryServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Tutorial Category Retrived Successfully",
    data: tutorialCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
