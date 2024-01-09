const asyncHandler = require("express-async-handler");
const { contactServicesV1 } = require("../../../lib/v1/contact");

const remove = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Remove a contact form
  const { delCode } = await contactServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
