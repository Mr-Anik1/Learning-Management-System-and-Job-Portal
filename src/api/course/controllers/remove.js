const asyncHandler = require("express-async-handler");
const { courseServicesV1 } = require("../../../lib/v1/course");

const remove = asyncHandler(async (req, res) => {
  const courseId = req.params?.courseId;

  // Remove a course
  const { delCode } = await courseServicesV1.remove({ courseId });

  res.status(delCode).send();
});

module.exports = { remove };
