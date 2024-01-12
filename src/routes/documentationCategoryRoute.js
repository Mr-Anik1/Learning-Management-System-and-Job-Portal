const {
  documentationCategoryControllers,
} = require("../api/documentationCategory");
const { authMiddleware } = require("../middlewares");

const documentationCategoryRoute = (router) => {
  // 1. Only admin can create documentation category.
  // 2. Anyone can find all documentation category.
  router
    .route("/api/v1/documentation/category")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationCategoryControllers.create
    )
    .get(documentationCategoryControllers.findAll);

  // Only admin can find Single,Update and Delete documentation category
  router
    .route("/api/v1/documentation/category/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationCategoryControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationCategoryControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      documentationCategoryControllers.remove
    );

  return router;
};

module.exports = { documentationCategoryRoute };
