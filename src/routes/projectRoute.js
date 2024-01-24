const { projectControllers } = require("../api/project");
const { authMiddleware } = require("../middlewares");

const projectRoute = (router) => {
  // 1. Only admins can create a new project.
  // 2. Anyone can find all approved project.
  router
    .route("/api/v1/projects")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectControllers.create
    )
    .get(projectControllers.findAll);

  // Anyone can find a single approved project with slug
  router.get(
    "/api/v1/projects/:categoryType/:slug",
    projectControllers.findSingle
  );

  // Only admins can Update and Delete a project.
  router
    .route("/api/v1/projects/:projectId")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      projectControllers.remove
    );

  /**
   * @Special_get_Route
   * FOR ONLY ADMINS
   */
  // Find all projects for only admins.
  router.get(
    "/api/v1/admin/projects",
    authMiddleware.authenticate,
    authMiddleware.authorize({
      roles: ["admin"],
    }),
    projectControllers.findAllForAdmin
  );

  // Find single project for only admins.
  router.get(
    "/api/v1/admin/projects/:projectId",
    authMiddleware.authenticate,
    authMiddleware.authorize({
      roles: ["admin"],
    }),
    projectControllers.findSingleForAdmin
  );

  return router;
};

module.exports = { projectRoute };
