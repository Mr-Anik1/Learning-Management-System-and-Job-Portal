const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("../middlewares");
const { appRouter } = require("../routes");

// Create App
const app = express();

/**
 * @Middlewares
 */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Router
app.use(appRouter());
// Error Handler
app.use(errorMiddleware.notFoundHandler);
app.use(errorMiddleware.globalErrorHandler);

// Export Express App
module.exports = { app };
