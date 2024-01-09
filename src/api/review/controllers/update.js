const { reviewServicesV1 } = require("../../../lib/v1/review");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const update = asyncHandler(async (req, res) => {
  // id and role from request object
  const {
    params: { id },
    user: { role: superUser },
  } = req;
  const { comment, color, status } = req.body;

  // Update a Review
  const review = await reviewServicesV1.update({
    id,
    superUser,
    comment,
    color,
    status,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Review Updated Successfully`,
    data: review,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
