const asyncHandler = require("express-async-handler");
const { courseCategoryServicesV1 } = require("../../../lib/v1/courseCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Course Category
  const courseCategory = await courseCategoryServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Course Category Retrived Successfully",
    data: courseCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
