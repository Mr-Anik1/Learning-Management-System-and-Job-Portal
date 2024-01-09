const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { contactServicesV1 } = require("../../../lib/v1/contact");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Retrive Single Contact Form
  const contact = await contactServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Contact Form Retrived Successfully",
    data: contact,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
