// All error class have been imported
const { CustomAPIError } = require("./customApi");
const { BadRequestError } = require("./badRequest");
const { NotFoundError } = require("./notFound");
const { UnauthenticatedError } = require("./unauthenticated");
const { InternalServerError } = require("./internalServer");
const { AuthorizationError } = require("./authorizaionError");

// All error class have been exported
module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  InternalServerError,
  AuthorizationError,
};
