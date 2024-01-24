const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookSessionServicesV1 } = require("../../../lib/v1/bookSession");

const findSingle = asyncHandler(async (req, res) => {
  const { bookSessionId } = req.params;

  // Retrive single bookSession
  const bookSession = await bookSessionServicesV1.findSingle({ bookSessionId });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Book-A-Session Retrived Successfully.",
    data: bookSession,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
