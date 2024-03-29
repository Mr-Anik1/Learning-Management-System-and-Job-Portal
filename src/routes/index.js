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
const { videoCategoryRoute } = require("./videoCategoryRoute");
const { documentationRoute } = require("./documentationRoute");
const { documentationCategoryRoute } = require("./documentationCategoryRoute");
const { blogRoute } = require("./blogRoute");
const { blogCategoryRoute } = require("./blogCategoryRoute");
const { courseRoute } = require("./courseRoute");
const { courseCategoryRoute } = require("./courseCategoryRoute");
const { lessonRoute } = require("./lessonRoute");
const { workWithUsRouter } = require("./workWithUsRoute");
const { projectCategoryRoute } = require("./projectCategory");
const { projectRoute } = require("./projectRoute");
const { bookSessionRoute } = require("./bookSessionRoute");

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

  // Review
  reviewRoute(router);

  // Contact Us
  contactRoute(router);

  // Video
  videoRoute(router);

  // Video Category
  videoCategoryRoute(router);

  // Documentations
  documentationRoute(router);

  // Documentation Category
  documentationCategoryRoute(router);

  // Blog
  blogRoute(router);

  // Blog Category
  blogCategoryRoute(router);

  // Course
  courseRoute(router);

  // Course Category
  courseCategoryRoute(router);

  // Lesson
  lessonRoute(router);

  // Work With Us Form
  workWithUsRouter(router);

  // Project Category
  projectCategoryRoute(router);

  // Project
  projectRoute(router);

  // Book a session
  bookSessionRoute(router);

  return router;
};

module.exports = { appRouter };
