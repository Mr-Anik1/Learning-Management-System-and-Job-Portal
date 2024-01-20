const asyncHandler = require("express-async-handler");
const { courseServicesV1 } = require("../../../lib/v1/course");
const { StatusCodes } = require("http-status-codes");

const findSingleForAdminAndInstructor = asyncHandler(async (req, res) => {
  const courseId = req.params?.courseId;

  // Retrive Single Course
  const course = await courseServicesV1.findSingleForAdminAndInstructor({
    courseId,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Course Retrived Successfully",
    data: course,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingleForAdminAndInstructor };
