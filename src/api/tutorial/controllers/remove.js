const asyncHandler = require("express-async-handler");
const { tutorialServicesV1 } = require("../../../lib/v1/tutorial");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove Tutorial Category
  const { delCode } = await tutorialServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
