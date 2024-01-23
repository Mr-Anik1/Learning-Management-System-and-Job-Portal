const asyncHandler = require("express-async-handler");
const {
  projectCategoryServicesV1,
} = require("../../../lib/v1/projectCategory");

const remove = asyncHandler(async (req, res) => {
  const { projectCategoryId } = req.params;

  // Remove Blog Category
  const { delCode } = await projectCategoryServicesV1.remove({
    projectCategoryId,
  });

  res.status(delCode).send();
});

module.exports = { remove };
