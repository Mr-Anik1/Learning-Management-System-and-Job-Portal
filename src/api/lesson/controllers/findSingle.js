const asyncHandler = require("express-async-handler");
const { lessonServicesV1 } = require("../../../lib/v1/lesson");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug, categoryType } = req.params;

  // Retrive Single Lesson
  const { lesson, lessonTopic } = await lessonServicesV1.findSingle({
    slug,
    categoryType,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Lesson Retrived Successfully",
    data: lesson,
    simillarTopic: lessonTopic,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
