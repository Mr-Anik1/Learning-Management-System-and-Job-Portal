const { CustomAPIError } = require("./customApi");
const { StatusCodes } = require("http-status-codes");

class InternalServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
    this.error = "Internal Server Error";
  }
}

module.exports = { InternalServerError };
