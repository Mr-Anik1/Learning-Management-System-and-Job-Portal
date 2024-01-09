const { reviewControllers } = require("../api/review");
const { authMiddleware } = require("../middlewares");

const reviewRoute = (router) => {
  // 1. Authenticate user can create a new review
  // 2. Anyone who access the internet can find all reviews.
  router
    .route("/api/v1/reviews")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "user"],
      }),
      reviewControllers.create
    )
    .get(reviewControllers.findAll);

  // 1. Only Admin can find a single review
  // 2~3. Authenticate user who is the actual owner of a review can update and delete the review.
  router
    .route("/api/v1/reviews/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      reviewControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "user"] }),
      authMiddleware.reviewOwnership({
        model: "Review",
      }),
      reviewControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "user"] }),
      authMiddleware.reviewOwnership({
        model: "Review",
      }),
      reviewControllers.remove
    );

  // Find All reviews for only admin.
  router.get(
    "/api/v1/admin/reviews",
    authMiddleware.authenticate,
    authMiddleware.authorize({
      roles: ["admin"],
    }),
    reviewControllers.findAllForAdmin
  );

  return router;
};

module.exports = { reviewRoute };
