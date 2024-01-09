const asyncHandler = require("express-async-handler");
const {
  tutorialCategoryServicesV1,
} = require("../../../lib/v1/tutorialCategory");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Tutorial Category
  const { delCode } = await tutorialCategoryServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
