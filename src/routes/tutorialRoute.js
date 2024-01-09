const { tutorialControllers } = require("../api/tutorial");
const { authMiddleware } = require("../middlewares");

const tutorialRoute = (router) => {
  // 1. Only admin can create a tutorial
  // 2. Anyone can find all tutorials
  router
    .route("/api/v1/tutorials")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialControllers.create
    )
    .get(tutorialControllers.findAll);

  // Anyone can find single tutorial
  router.get("/api/v1/tutorials/:type/:slug", tutorialControllers.findSingle);

  // Only admin can update and remove a tutorial
  router
    .route("/api/v1/tutorials/:id")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      tutorialControllers.remove
    );

  return router;
};

module.exports = { tutorialRoute };
