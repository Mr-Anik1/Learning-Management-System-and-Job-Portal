const asyncHandler = require("express-async-handler");
const { courseServicesV1 } = require("../../../lib/v1/course");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug, categoryType } = req.params;

  // Retrive Single Course
  const { course, courseTopic } = await courseServicesV1.findSingle({
    slug,
    categoryType,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Course Retrived Successfully",
    data: course,
    simillarTopic: courseTopic,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
