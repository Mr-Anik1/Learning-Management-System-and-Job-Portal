const asyncHandler = require("express-async-handler");
const { bookSessionServicesV1 } = require("../../../lib/v1/bookSession");

const remove = asyncHandler(async (req, res) => {
  const { bookSessionId } = req.params;

  // Remove a Review
  const { delCode } = await bookSessionServicesV1.remove({ bookSessionId });

  res.status(delCode).send();
});

module.exports = { remove };
