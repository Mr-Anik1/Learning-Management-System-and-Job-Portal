// All authentication and authorization middlewares have been imported
const { authenticate } = require("./authenticate");
const { authorize } = require("./authorize");
const { userOwnership } = require("./userOwnership");
const { reviewOwnership } = require("./reviewOwnership");
const { courseOwnership } = require("./courseOwnership");
const { lessonOwnership } = require("./lessonOwnership");

// All authentication and authorization middleware have been exported
module.exports = {
  authenticate,
  authorize,
  userOwnership,
  reviewOwnership,
  courseOwnership,
  lessonOwnership,
};
