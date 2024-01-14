const { videoCategoryControllers } = require("../api/videoCategory");
const { authMiddleware } = require("../middlewares");

const videoCategoryRoute = (router) => {
  // 1. Only admin can create video category.
  // 2. Anyone can find all video category.
  router
    .route("/api/v1/video/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoCategoryControllers.create
    )
    .get(videoCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete video category
  router
    .route("/api/v1/video/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoCategoryControllers.remove
    );

  return router;
};

module.exports = { videoCategoryRoute };
