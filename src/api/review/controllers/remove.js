const asyncHandler = require("express-async-handler");
const { reviewServicesV1 } = require("../../../lib/v1/review");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a Review
  const { delCode } = await reviewServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
