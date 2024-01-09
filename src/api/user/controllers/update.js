const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { userServicesV1 } = require("../../../lib/v1/user");

const update = asyncHandler(async (req, res) => {
  // Profile Picture File path
  const imageFilePath = req.file?.path;
  // id and role from request object
  const {
    params: { id },
    user: { role: superUser },
  } = req;
  // Other filds from request body
  const {
    firstname,
    lastname,
    email,
    mobile,
    password,
    profession,
    role,
    status,
  } = req.body;

  // Update User
  const updatedUser = await userServicesV1.update({
    id,
    imageFilePath,
    superUser,
    firstname,
    lastname,
    email,
    mobile,
    password,
    profession,
    role,
    status,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "User Updated Successfully",
    data: updatedUser,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
