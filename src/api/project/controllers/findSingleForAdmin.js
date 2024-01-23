const asyncHandler = require("express-async-handler");
const { projectServicesV1 } = require("../../../lib/v1/project");
const { StatusCodes } = require("http-status-codes");

const findSingleForAdmin = asyncHandler(async (req, res) => {
  const projectId = req.params?.projectId;

  // Retrive single project
  const project = await projectServicesV1.findSingleForAdmin({ projectId });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Project Retrived Successfully",
    data: project,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingleForAdmin };
