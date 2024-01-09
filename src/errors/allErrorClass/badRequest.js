const { CustomAPIError } = require("./customApi");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.code = StatusCodes.BAD_REQUEST;
    this.error = "Bad Request";
  }
}

module.exports = { BadRequestError };
