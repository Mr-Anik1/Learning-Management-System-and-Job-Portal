const { userControllers } = require("../api/user");
const { authMiddleware } = require("../middlewares");

const userRoute = (router) => {
  // Only admins can find all users.
  router.get(
    "/api/v1/users",
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin"] }),
    userControllers.findAll
  );

  // Admin, authenticate, and authorize users (who are the actual owners) can find a single user, update a user, and delete a user.
  router
    .route("/api/v1/users/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor", "user"] }),
      authMiddleware.userOwnership({ model: "User" }),
      userControllers.remove
    );

  return router;
};

module.exports = { userRoute };
