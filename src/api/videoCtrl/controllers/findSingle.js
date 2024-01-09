const asyncHandler = require("express-async-handler");
const { videoServicesV1 } = require("../../../lib/v1/videoService");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Retrive Single Video
  const singleVideo = await videoServicesV1.findSingle({
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Video Retrived Successfully",
    data: singleVideo,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
