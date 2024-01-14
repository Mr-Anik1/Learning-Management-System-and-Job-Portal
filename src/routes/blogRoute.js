const { blogControllers } = require("../api/blog");
const { authMiddleware } = require("../middlewares");

const blogRoute = (router) => {
  // 1. Only admin can post/create a blog.
  // 2. Anyone can find all blogs
  router
    .route("/api/v1/blogs")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogControllers.create
    )
    .get(blogControllers.findAll);

  // Anyone can find a single blog with slug
  router.get("/api/v1/blogs/:categoryType/:slug", blogControllers.findSingle);

  // Only admin can update and delete a blog
  router
    .route("/api/v1/blogs/:id")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogControllers.remove
    );

  return router;
};

module.exports = { blogRoute };
