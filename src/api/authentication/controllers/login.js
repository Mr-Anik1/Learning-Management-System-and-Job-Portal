const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { authServicesV1 } = require("../../../lib/v1/authentication");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // User Login Token
  const token = await authServicesV1.login({ email, password });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Login Successful",
    data: {
      access_token: token,
    },
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { login };
