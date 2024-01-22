const { workWithUsControllers } = require("../api/workWithUs");
const { authMiddleware } = require("../middlewares");

const workWithUsRouter = (router) => {
  // 1.Authenticate users can create/submit a work-with-us form.
  // 2.Only admins can find all work-with-us forms.
  router
    .route("/api/v1/works")
    .post(authMiddleware.authenticate, workWithUsControllers.create)
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({ roles: ["admin"] }),
      workWithUsControllers.findAll
    );

  // 1.Only admins can find single work-with-us form by its id.
  // 2.Admins and the actual owners of a work-with-us form can update the single work-with-us form.
  // 3.Only admins can delete a work-with-us form.
  router
    .route("/api/v1/works/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      workWithUsControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin", "user", "instructor"],
      }),
      authMiddleware.workWithUsOwnership({ model: "WorkWithUS" }),
      workWithUsControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      workWithUsControllers.remove
    );

  return router;
};

module.exports = {
  workWithUsRouter,
};
