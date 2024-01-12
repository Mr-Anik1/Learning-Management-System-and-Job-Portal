const { tutorialCategoryControllers } = require("../api/tutorialCategory");
const { authMiddleware } = require("../middlewares");

const tutorialCategoryRoute = (router) => {
  // 1. Only admin can create tutorial category.
  // 2. Anyone can find all tutorial category.
  router
    .route("/api/v1/tutorial/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.create
    )
    .get(tutorialCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete tutorial category
  router
    .route("/api/v1/tutorial/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.remove
    );

  return router;
};

module.exports = { tutorialCategoryRoute };
