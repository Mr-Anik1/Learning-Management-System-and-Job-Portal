const asyncHandler = require("express-async-handler");
const {
  documentationCategoryServicesV1,
} = require("../../../lib/v1/documentationCategory");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Documentation Category
  const { delCode } = await documentationCategoryServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
