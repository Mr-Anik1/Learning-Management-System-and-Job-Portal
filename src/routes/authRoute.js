const { authControllers } = require("../api/authentication");

const authRoute = (router) => {
  // Register a new user
  router.post("/api/v1/auth/register", authControllers.register);
  // Login a user
  router.post("/api/v1/auth/login", authControllers.login);

  return router;
};

module.exports = { authRoute };
