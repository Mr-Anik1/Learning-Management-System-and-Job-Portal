const { userControllers } = require("../api/user");
const { authMiddleware } = require("../middlewares");

const userRoute = (router) => {
  // Find All Users
  router.get(
    "/api/v1/users",
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin"] }),
    userControllers.findAll
  );
  // Find Single,Update and Remove User
  router
    .route("/api/v1/users/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.remove
    );

  return router;
};

module.exports = { userRoute };
