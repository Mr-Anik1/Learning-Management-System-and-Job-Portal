const { StatusCodes } = require("http-status-codes");
const { errors } = require("../../errors");

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);

  // If the error is a custom error
  if (err instanceof errors.CustomAPIError) {
    return res
      .status(err.code)
      .json({ code: err.code, error: err.error, message: err.message });
  }

  /**
   * @SPECIAL_FOR_OPENAPI_VALIDATOR_MIDDLEWARE_START
   */
  // Handle the "Method Not Allowed" error
  if (err.status === StatusCodes.METHOD_NOT_ALLOWED) {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      code: StatusCodes.METHOD_NOT_ALLOWED,
      error: "Method Not Allowed",
      message: "The requested method is not allowed for this resource",
    });
  }

  // Handle the "Not Found" error
  if (err.status === StatusCodes.NOT_FOUND) {
    return res.status(StatusCodes.NOT_FOUND).json({
      code: StatusCodes.NOT_FOUND,
      error: "Not Found",
      message: "Requested Route Doesn't Exist",
    });
  }

  // Handle the "Bad Request
  if (err.status === StatusCodes.BAD_REQUEST) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      error: "Bad Request",
      message: "Invalid Credentials",
    });
  }
  /**
   * @SPECIAL_FOR_OPENAPI_VALIDATOR_MIDDLEWARE_END
   */

  // If the error is not a known custom error, return a generic internal server error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    error: `Internal Server Error`,
    message: `Server error. Please try again later.`,
  });
};

module.exports = { globalErrorHandler };
