const asyncHandler = require("express-async-handler");
const { projectServicesV1 } = require("../../../lib/v1/project");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug, categoryType } = req.params;

  // Retrive Single Project
  const { project, projectTopic } = await projectServicesV1.findSingle({
    slug,
    categoryType,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Project Retrived Successfully",
    data: project,
    simillarTopic: projectTopic,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
