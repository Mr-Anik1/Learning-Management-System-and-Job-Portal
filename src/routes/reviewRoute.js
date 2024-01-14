const { reviewControllers } = require("../api/review");
const { authMiddleware } = require("../middlewares");

const reviewRoute = (router) => {
  // 1. Only authenticated and authorized users can create a new review.
  // 2. Anyone who accesses the internet can find all the reviews.
  router
    .route("/api/v1/reviews")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "instructor", "user"],
      }),
      reviewControllers.create
    )
    .get(reviewControllers.findAll);

  // 1. Only admins can find a single review.
  // 2~3. Authenticated, authorized users (and the actual owner of a review) can update and delete a review.
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
      authMiddleware.authorize({ roles: ["admin", "instructor", "user"] }),
      authMiddleware.reviewOwnership({
        model: "Review",
      }),
      reviewControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin", "instructor", "user"] }),
      authMiddleware.reviewOwnership({
        model: "Review",
      }),
      reviewControllers.remove
    );

  // Find all reviews for only admins.
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
