const { CustomAPIError } = require("./customApi");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.code = StatusCodes.NOT_FOUND;
    this.error = "Not Found";
  }
}

module.exports = { NotFoundError };
