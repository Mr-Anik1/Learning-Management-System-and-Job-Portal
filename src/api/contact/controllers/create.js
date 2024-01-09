const asyncHandler = require("express-async-handler");
const { contactServicesV1 } = require("../../../lib/v1/contact");
const { StatusCodes } = require("http-status-codes");

const create = asyncHandler(async (req, res) => {
  const { name, email, mobile, profession, subject, comment } = req.body;

  // Create a contact form
  const contact = await contactServicesV1.create({
    name,
    email,
    mobile,
    profession,
    subject,
    comment,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: `Contact Form Submitted Successfully.`,
    data: contact,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
