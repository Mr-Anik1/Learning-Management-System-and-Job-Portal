const { courseControllers } = require("../api/course");
const { authMiddleware } = require("../middlewares");

const courseRoute = (router) => {
  // 1. Only admins and instructors can create a new course.
  // 2. Anyone can find all course.
  router
    .route("/api/v1/courses")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      courseControllers.create
    )
    .get(courseControllers.findAll);

  // Anyone can find a single course with slug
  router.get(
    "/api/v1/courses/:categoryType/:slug",
    courseControllers.findSingle
  );

  // Only admins and instructors(who are the actual owner of a course) can Update and Delete a course.
  router
    .route("/api/v1/courses/:courseId")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.courseOwnership({ model: "Course" }),
      courseControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.courseOwnership({ model: "Course" }),
      courseControllers.remove
    );

  /**
   * @Special_get_Route
   * For admins and instructor
   */
  // Find all courses for only admins.
  router.get(
    "/api/v1/admin/courses",
    authMiddleware.authenticate,
    authMiddleware.authorize({
      roles: ["admin"],
    }),
    courseControllers.findAllForAdmin
  );

  // Find single course for admins and instructors(who are the actual owner of a course)
  router.get(
    "/api/v1/admin-instructor/courses/:courseId",
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "instructor"] }),
    authMiddleware.courseOwnership({ model: "Course" }),
    courseControllers.findSingleForAdminAndInstructor
  );

  return router;
};

module.exports = { courseRoute };
