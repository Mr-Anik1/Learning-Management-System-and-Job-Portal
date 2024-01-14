const asyncHandler = require("express-async-handler");
const { videoCategoryServicesV1 } = require("../../../lib/v1/videoCategory");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Video Category
  const { delCode } = await videoCategoryServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
