const asyncHandler = require("express-async-handler");
const { userServicesV1 } = require("../../../lib/v1/user");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove User
  const { delCode } = await userServicesV1.remove({
    id,
  });

  res.status(delCode).send();
});

module.exports = { remove };
