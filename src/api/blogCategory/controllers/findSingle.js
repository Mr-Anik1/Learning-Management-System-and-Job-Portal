const asyncHandler = require("express-async-handler");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");
const { StatusCodes } = require("http-status-codes");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Blog Category
  const blogCategory = await blogCategoryServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Blog Category Retrived Successfully",
    data: blogCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
