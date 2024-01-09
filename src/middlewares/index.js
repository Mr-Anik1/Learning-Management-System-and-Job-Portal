// All middlewares have been imported
const errorMiddleware = require("./error");
const authMiddleware = require("./auth");

// All middlewares have been exported
module.exports = { errorMiddleware, authMiddleware };
