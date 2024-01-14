const asyncHandler = require("express-async-handler");
const { videoCategoryServicesV1 } = require("../../../lib/v1/videoCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Video Category
  const videoCategory = await videoCategoryServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Video Category Retrived Successfully",
    data: videoCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
