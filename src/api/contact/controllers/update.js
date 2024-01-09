const { contactServicesV1 } = require("../../../lib/v1/contact");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const update = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { status } = req.body;

  // Update a contact form status
  const contact = await contactServicesV1.update({
    id,
    status,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Contact Form Updated Successfully`,
    data: contact,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
