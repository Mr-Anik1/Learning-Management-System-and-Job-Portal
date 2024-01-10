const asyncHandler = require("express-async-handler");
const { documentationServicesV1 } = require("../../../lib/v1/documentation");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Retrive a documentation
  const documentation = await documentationServicesV1.findSingle({
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Documentation Retrived Successfully",
    data: documentation,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
