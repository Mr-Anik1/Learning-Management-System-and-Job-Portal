const { lessonControllers } = require("../api/lesson");
const { authMiddleware } = require("../middlewares");

const lessonRoute = (router) => {
  // 1.Only admins and instructors(who are the actual owner of the course) can create a new lesson and add it to the course.
  // 2.Anyone can find all course-lessons with courseId.
  router
    .route("/api/v1/lessons/:courseId")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor"] }),
      authMiddleware.courseOwnership({ model: "Course" }),
      lessonControllers.create
    )
    .get(lessonControllers.findAll);

  // 1.Anyone can find a single lesson with lessonId.
  // 2.Only admins and instructors(who are the actual owner of a lesson) can Update the lesson.
  router
    .route("/api/v1/lessons/:lessonId")
    .get(lessonControllers.findSingle)
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
