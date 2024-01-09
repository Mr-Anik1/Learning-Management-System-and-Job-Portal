const asyncHandler = require("express-async-handler");
const { newsLetterServicesV1 } = require("../../../lib/v1/newsLetter");

const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Unsubscribe The News Letter
  const { delCode } = await newsLetterServicesV1.unsubscribe({ email });

  res.status(delCode).send();
});

module.exports = { unsubscribe };
