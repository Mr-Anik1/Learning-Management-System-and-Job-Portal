const asyncHandler = require("express-async-handler");
const { blogServicesV1 } = require("../../../lib/v1/blog");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const { slug, categoryType } = req.params;

  // Retrive Single Blog
  const { blog, blogTopic } = await blogServicesV1.findSingle({
    slug,
    categoryType,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Blog Retrived Successfully",
    data: blog,
    simillarTopic: blogTopic,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
