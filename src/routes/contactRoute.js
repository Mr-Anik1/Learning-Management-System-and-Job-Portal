const { contactControllers } = require("../api/contact");
const { authMiddleware } = require("../middlewares");

const contactRoute = (router) => {
  // 1. Anyone in the internet can create a contact form
  // 2. Only admin can findAll contacts.
  router
    .route("/api/v1/contacts")
    .post(contactControllers.create)
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      contactControllers.findAll
    );

  // Only Admin can findSingle, update and delete a contact form.
  router
    .route("/api/v1/contacts/:id")
    .get(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      contactControllers.findSingle
    )
    .patch(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      contactControllers.update
    )
    .delete(
      authMiddleware.authenticate,
      authMiddleware.authorize({
        roles: ["admin"],
      }),
      contactControllers.remove
    );

  return router;
};

module.exports = { contactRoute };
