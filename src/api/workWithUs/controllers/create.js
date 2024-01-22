const asyncHandler = require("express-async-handler");
const { workWithUsServicesV1 } = require("../../../lib/v1/workWithUs");
const { StatusCodes } = require("http-status-codes");

const create = asyncHandler(async (req, res) => {
  // Applicant ID from request user
  const applicantId = req.user?.userId;

  // Filds from request body
  const {
    name,
    email,
    mobile,
    profession,
    specialization,
    currentJob,
    resume,
    portfolio,
    coverLetter,
    linkedinProfile,
    expectedSalary,
  } = req.body;

  // Create a work with us form
  const workWithUs = await workWithUsServicesV1.create({
    applicantId,
    name,
    email,
    mobile,
    profession,
    specialization,
    currentJob,
    resume,
    portfolio,
    coverLetter,
    linkedinProfile,
    expectedSalary,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Work-With-Us Form Submitted Successfully.`,
    data: workWithUs,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
