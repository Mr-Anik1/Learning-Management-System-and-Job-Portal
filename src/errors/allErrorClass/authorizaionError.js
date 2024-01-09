const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./customApi");

class AuthorizationError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.code = StatusCodes.FORBIDDEN;
    this.error = "Authorization Error";
  }
}

module.exports = { AuthorizationError };
