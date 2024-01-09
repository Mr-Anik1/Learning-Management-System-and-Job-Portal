const { newsLetterControllers } = require("../api/newsLetter");
const { authMiddleware } = require("../middlewares");

const newsLetterRoute = (router) => {
  // 1.=> ONLY-ADMIN: Find All news letters subscribers
  // 2.=> Subscribe
  // 3.=> Unsubscribe
  router
    .route("/api/v1/newsletter")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      newsLetterControllers.findAll
    )
    .post(newsLetterControllers.subscribe)
    .delete(newsLetterControllers.unsubscribe);

  return router;
};

module.exports = { newsLetterRoute };
