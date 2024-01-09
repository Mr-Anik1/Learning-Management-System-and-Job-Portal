const asyncHandler = require("express-async-handler");
const { videoServicesV1 } = require("../../../lib/v1/videoService");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a video
  const { delCode } = await videoServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
