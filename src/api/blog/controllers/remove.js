const asyncHandler = require("express-async-handler");
const { blogServicesV1 } = require("../../../lib/v1/blog");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a blog
  const { delCode } = await blogServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
