const asyncHandler = require("express-async-handler");
const {
  projectCategoryServicesV1,
} = require("../../../lib/v1/projectCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { projectCategoryId } = req.params;

  // Retrive single project category
  const projectCategory = await projectCategoryServicesV1.findSingle({
    projectCategoryId,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Project Category Retrived Successfully",
    data: projectCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
