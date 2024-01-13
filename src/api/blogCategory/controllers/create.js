const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");

const create = asyncHandler(async (req, res) => {
  const { title } = req.body;

  // Create blog category
  const blogCategory = await blogCategoryServicesV1.create({
    title,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Blog Category Created Successfully`,
    data: blogCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
