const asyncHandler = require("express-async-handler");
const { documentationServicesV1 } = require("../../../lib/v1/documentation");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a documentation
  const { delCode } = await documentationServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
