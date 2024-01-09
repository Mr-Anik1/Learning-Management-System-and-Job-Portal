// All error middlewares have been imported
const { notFoundHandler } = require("./notFoundHandler");
const { globalErrorHandler } = require("./globalErrorHandler");

// All error middlewares have been exported
module.exports = { notFoundHandler, globalErrorHandler };
