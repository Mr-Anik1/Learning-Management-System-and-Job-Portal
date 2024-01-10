const { documentationControllers } = require("../api/documentation");
const { authMiddleware } = require("../middlewares");

const documentationRoute = (router) => {
  // 1. Only admin can post/create a documentation.
  // 2. Anyone can find all documentations
  router
    .route("/api/v1/documentations")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationControllers.create
    )
    .get(documentationControllers.findAll);

  // Anyone can find a single documentation with slug
  router.get(
    "/api/v1/documentations/:slug",
    documentationControllers.findSingle
  );

  // Only admin can update and delete a documentation
  router
    .route("/api/v1/documentations/:id")
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationControllers.remove
    );

  return router;
};

module.exports = { documentationRoute };
