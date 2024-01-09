const asyncHandler = require("express-async-handler");
const { reviewServicesV1 } = require("../../../lib/v1/review");
const { StatusCodes } = require("http-status-codes");

const create = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { comment, color } = req.body;

  // Create Review
  const review = await reviewServicesV1.create({
    userId,
    comment,
    color,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Review Added Successfully`,
    data: review,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
