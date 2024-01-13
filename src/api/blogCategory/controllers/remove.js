const asyncHandler = require("express-async-handler");
const { blogCategoryServicesV1 } = require("../../../lib/v1/blogCategory");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Blog Category
  const { delCode } = await blogCategoryServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
