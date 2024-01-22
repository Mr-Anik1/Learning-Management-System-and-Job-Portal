const { workWithUsServicesV1 } = require("../../../lib/v1/workWithUs");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const update = asyncHandler(async (req, res) => {
  // Work-With-US ID
  const id = req.params?.id;

  // User Role
  const superUser = req.user?.role;

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
    status,
  } = req.body;

  /**
   * @Generate_paylod
   */
  const payload = {
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
  };

  // Update a Work-With-US form status
  const workWithUs = await workWithUsServicesV1.update({
    id,
    superUser,
    status,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Work-With-US Form Updated Successfully`,
    data: workWithUs,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
