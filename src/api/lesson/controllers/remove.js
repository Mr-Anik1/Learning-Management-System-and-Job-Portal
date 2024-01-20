const asyncHandler = require("express-async-handler");
const { lessonServicesV1 } = require("../../../lib/v1/lesson");

const remove = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;

  // Remove a lesson
  const { delCode } = await lessonServicesV1.remove({ courseId, lessonId });

  res.status(delCode).send();
});

module.exports = { remove };
