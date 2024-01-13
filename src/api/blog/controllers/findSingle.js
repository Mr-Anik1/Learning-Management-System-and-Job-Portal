const asyncHandler = require("express-async-handler");
const { blogServicesV1 } = require("../../../lib/v1/blog");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Retrive Single Blog
  const blog = await blogServicesV1.findSingle({
    slug,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Blog Retrived Successfully",
    data: blog,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
