const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");

const update = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { title } = req.body;

  // Update Blog Category
  const blogCategory = await blogCategoryServicesV1.update({
    id,
    title,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Blog Category Updated Successfully`,
    data: blogCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
