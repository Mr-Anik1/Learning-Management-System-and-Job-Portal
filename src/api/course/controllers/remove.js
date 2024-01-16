const asyncHandler = require("express-async-handler");
const { courseServicesV1 } = require("../../../lib/v1/course");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a course
  const { delCode } = await courseServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
