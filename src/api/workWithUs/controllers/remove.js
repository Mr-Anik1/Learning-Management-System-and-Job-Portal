const asyncHandler = require("express-async-handler");
const { workWithUsServicesV1 } = require("../../../lib/v1/workWithUs");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a Work-With-US form
  const { delCode } = await workWithUsServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
