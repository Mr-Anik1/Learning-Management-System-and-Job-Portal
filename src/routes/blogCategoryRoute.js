const { blogCategoryControllers } = require("../api/blogCategory");
const { authMiddleware } = require("../middlewares");

const blogCategoryRoute = (router) => {
  // 1. Only admin can create blog category.
  // 2. Anyone can find all blog category.
  router
    .route("/api/v1/blog/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogCategoryControllers.create
    )
    .get(blogCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete blog category
  router
    .route("/api/v1/blog/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      blogCategoryControllers.remove
    );

  return router;
};

module.exports = { blogCategoryRoute };
