const { courseCategoryControllers } = require("../api/courseCategory");
const { authMiddleware } = require("../middlewares");

const courseCategoryRoute = (router) => {
  // 1. Only admin and instructor can create a new course category.
  // 2. Anyone can find all course category.
  router
    .route("/api/v1/course/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseCategoryControllers.create
    )
    .get(courseCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete course category
  router
    .route("/api/v1/course/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      courseCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      courseCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      courseCategoryControllers.remove
    );

  return router;
};

module.exports = { courseCategoryRoute };
