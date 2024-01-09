const asyncHandler = require("express-async-handler");
const { tutorialServicesV1 } = require("../../../lib/v1/tutorial");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug, type } = req.params;

  // Retrive Single Tutorial
  const { tutorial, tutorialTopic } = await tutorialServicesV1.findSingle({
    slug,
    type,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Tutorial Retrived Successfully",
    data: tutorial,
    simillarTopic: tutorialTopic,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
