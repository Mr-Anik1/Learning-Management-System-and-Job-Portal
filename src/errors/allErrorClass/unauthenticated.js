const { CustomAPIError } = require("./customApi");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.code = StatusCodes.UNAUTHORIZED;
    this.error = "Unauthenticated";
  }
}

module.exports = { UnauthenticatedError };
