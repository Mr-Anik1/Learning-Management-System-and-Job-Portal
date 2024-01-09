const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { authServicesV1 } = require("../../../lib/v1/authentication");

const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, mobile, password, profession } = req.body;

  // Create account and generate token
  const token = await authServicesV1.register({
    firstname,
    lastname,
    email,
    mobile,
    password,
    profession,
  });

  // Generate response
  const response = {
    code: StatusCodes.CREATED,
    message: "Account Created Successfully",
    data: {
      access_token: token,
    },
    links: {
      self: req.url,
      login: req.url.replace("register", "login"),
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { register };
