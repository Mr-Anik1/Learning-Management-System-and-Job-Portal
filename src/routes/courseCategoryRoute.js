const { courseCategoryControllers } = require("../api/courseCategory");
const { authMiddleware } = require("../middlewares");

const courseCategoryRoute = (router) => {
  // 1. Only admins and instructors can create a new course category.
  // 2. Anyone can find all course categories.
  router
    .route("/api/v1/course/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseCategoryControllers.create
    )
    .get(courseCategoryControllers.findAll);

  // Only admins and instructors can find the Single, Update, and Delete a course category.
  router
    .route("/api/v1/course/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseCategoryControllers.remove
    );

  return router;
};

module.exports = { courseCategoryRoute };
