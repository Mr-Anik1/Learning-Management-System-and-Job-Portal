const { rateLimit } = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");

const rateLimiter = ({ time = 15, maxReq = 100, message }) => {
  const limiter = rateLimit({
    windowMs: time * 60 * 1000,
    limit: maxReq, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      code: StatusCodes.TOO_MANY_REQUESTS,
      status: false,
      message:
        message ||
        `Too many requests, please try again after ${
          time ? time : 15
        } minutes.`,
    },
  });

  return limiter;
};

module.exports = { rateLimiter };
