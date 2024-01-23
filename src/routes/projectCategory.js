const { projectCategoryControllers } = require("../api/projectCategory");
const { authMiddleware } = require("../middlewares");

const projectCategoryRoute = (router) => {
  // 1. Only admin can create project category.
  // 2. Anyone can find all project category.
  router
    .route("/api/v1/project/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectCategoryControllers.create
    )
    .get(projectCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete project category
  router
    .route("/api/v1/project/category/:projectCategoryId")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectCategoryControllers.remove
    );

  return router;
};

module.exports = { projectCategoryRoute };
