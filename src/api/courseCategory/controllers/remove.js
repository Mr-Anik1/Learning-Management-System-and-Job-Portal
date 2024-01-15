const asyncHandler = require("express-async-handler");
const { courseCategoryServicesV1 } = require("../../../lib/v1/courseCategory");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Course Category
  const { delCode } = await courseCategoryServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
