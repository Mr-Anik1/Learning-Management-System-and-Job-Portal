const { bookSessionControllers } = require("../api/bookSession");
const { authMiddleware } = require("../middlewares");

const bookSessionRoute = (router) => {
  // 1.Authenticate and authorize users can create book-a-session
  // 2.Only admins can findAll bookSessions.
  router
    .route("/api/v1/booksessions")
    .post(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "instructor", "user"],
      }),
      bookSessionControllers.create
    )
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      bookSessionControllers.findAll
    );

  // 1~2.Admins and the actual owner of a bookSessions can get single bookSession and update bookSession.
  // 3.Only admins can delete a bookSession.
  router
    .route("/api/v1/booksessions/:bookSessionId")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "instructor", "user"],
      }),
      authMiddleware.bookSessionOwnership({ model: "BookSession" }),
      bookSessionControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "instructor", "user"],
      }),
      authMiddleware.bookSessionOwnership({ model: "BookSession" }),
      bookSessionControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      bookSessionControllers.remove
    );

  return router;
};

module.exports = { bookSessionRoute };
