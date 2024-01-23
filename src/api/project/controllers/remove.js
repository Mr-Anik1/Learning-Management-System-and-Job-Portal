const asyncHandler = require("express-async-handler");
const { projectServicesV1 } = require("../../../lib/v1/project");

const remove = asyncHandler(async (req, res) => {
  const projectId = req.params?.projectId;

  // Remove a course
  const { delCode } = await projectServicesV1.remove({ projectId });

  res.status(delCode).send();
});

module.exports = { remove };
