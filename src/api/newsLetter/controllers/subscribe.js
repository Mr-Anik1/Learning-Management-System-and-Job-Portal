const asyncHandler = require("express-async-handler");
const { newsLetterServicesV1 } = require("../../../lib/v1/newsLetter");

const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Subscribe The News Letter
  const { createCode } = await newsLetterServicesV1.subscribe({ email });

  // Generate Response
  const response = {
    code: createCode,
    message: `News Letter Subscription Successfully Done.`,
    links: {
      self: req.url,
    },
  };

  res.status(createCode).json(response);
});

module.exports = { subscribe };
