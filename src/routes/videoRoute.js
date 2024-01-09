const { videoControllers } = require("../api/videoCtrl");
const { authMiddleware } = require("../middlewares");

const videoRoute = (router) => {
  // 1. Only admin can post/create a video.
  // 2. Anyone can find all videos
  router
    .route("/api/v1/videos")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoControllers.create
    )
    .get(videoControllers.findAll);

  // Anyone can find a single video with slug
  router.get("/api/v1/videos/:slug", videoControllers.findSingle);

  // Only admin can update and delete a video
  router
    .route("/api/v1/videos/:id")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      videoControllers.remove
    );

  return router;
};

module.exports = { videoRoute };
