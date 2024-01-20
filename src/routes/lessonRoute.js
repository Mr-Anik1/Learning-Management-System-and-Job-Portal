const { lessonControllers } = require("../api/lesson");
const { authMiddleware } = require("../middlewares");

const lessonRoute = (router) => {
  // Only admins and instructors(who are the actual owner of the course) can create a new lesson and add it to the course.
  router
    .route("/api/v1/lessons/:courseId")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.courseOwnership({ model: "Course" }),
      lessonControllers.create
    );

  // Anyone can find all lesson.
  router.get("/api/v1/lessons", lessonControllers.findAll);

  // Anyone can find a single lesson with slug
  router.get(
    "/api/v1/lessons/:categoryType/:slug",
    lessonControllers.findSingle
  );

  // Only admins and instructors(who are the actual owner of a lesson) can Update the lesson.
  router
    .route("/api/v1/lessons/:lessonId")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.lessonOwnership({ model: "Lesson" }),
      lessonControllers.update
    );

  // Only admins and instructors(who are the actual owner of a course and lesson) can delete the lesson from the course and database.
  router
    .route("/api/v1/lessons/:courseId/:lessonId")
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.courseOwnership({ model: "Course" }),
      authMiddleware.lessonOwnership({ model: "Lesson" }),
      lessonControllers.remove
    );

  return router;
};

module.exports = { lessonRoute };
