const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { reviewServicesV1 } = require("../../../lib/v1/review");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Review
  const review = await reviewServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Review Retrived Successfully",
    data: review,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
