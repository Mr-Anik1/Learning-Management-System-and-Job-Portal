const { tutorialCategoryControllers } = require("../api/tutorialCategory");
const { authMiddleware } = require("../middlewares");

const tutorialCategoryRoute = (router) => {
  // Create and Find All Tutorial Category -> Only Admin
  router
    .route("/api/v1/tutorial/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.create
    )
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialCategoryControllers.findAll
    );

  // Find Single,Update and Delete Tutorial Category
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
