const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const health = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    message: "Everything is running perfectly",
    links: {
      self: req.url,
    },
  });
});

module.exports = { health };
