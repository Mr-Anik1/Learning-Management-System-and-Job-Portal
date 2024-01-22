const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { workWithUsServicesV1 } = require("../../../lib/v1/workWithUs");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single workWithUs Form
  const workWithUs = await workWithUsServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Work-With-US Form Retrived Successfully",
    data: workWithUs,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
