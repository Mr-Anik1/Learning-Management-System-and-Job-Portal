const router = require("express").Router();
const { healthRoute } = require("./healthRoute");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { passwordRoute } = require("./passwordRoute");
const { tutorialCategoryRoute } = require("./tutorialCategoryRoute");
const { tutorialRoute } = require("./tutorialRoute");
const { newsLetterRoute } = require("./newsLetterRoute");
const { reviewRoute } = require("./reviewRoute");
const { contactRoute } = require("./contactRoute");
const { videoRoute } = require("./videoRoute");

const appRouter = () => {
  // Health Check
  healthRoute(router);

  // Authentication User -> Register(create user) & Login
  authRoute(router);

  // User
  userRoute(router);

  // Password Route -> forgot and reset password
  passwordRoute(router);

  // Tutorial Category
  tutorialCategoryRoute(router);

  // Tutorials
  tutorialRoute(router);

  // Subscribe and Unsubscribe News Letter
  newsLetterRoute(router);

  // Post a Review
  reviewRoute(router);

  // Contact Us
  contactRoute(router);

  // Video
  videoRoute(router);

  return router;
};

module.exports = { appRouter };
