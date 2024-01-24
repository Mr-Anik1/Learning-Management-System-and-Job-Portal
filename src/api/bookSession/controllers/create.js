const asyncHandler = require("express-async-handler");
const { bookSessionServicesV1 } = require("../../../lib/v1/bookSession");
const { StatusCodes } = require("http-status-codes");

const create = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;

  // Filds from request body
  const { subject, description, timeslot } = req.body;

  // Create bookSession
  const bookSession = await bookSessionServicesV1.create({
    userId,
    subject,
    description,
    timeslot,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Book-A-Session Submitted Successfully.`,
    data: bookSession,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
