const { bookSessionServicesV1 } = require("../../../lib/v1/bookSession");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const update = asyncHandler(async (req, res) => {
  //  bookSessionId and role from request object
  const {
    params: { bookSessionId },
    user: { role: superUser },
  } = req;

  // Filds from request body
  const { subject, description, timeslot, status } = req.body;

  /**
   * @Generate_paylod
   */
  const payload = {
    subject,
    description,
    timeslot,
  };

  // Update bookSession
  const bookSession = await bookSessionServicesV1.update({
    bookSessionId,
    superUser,
    status,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Book-A-Session Updated Successfully.`,
    data: bookSession,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
