const { passwordControllers } = require("../api/password");
const { authMiddleware } = require("../middlewares");

const passwordRoute = (router) => {
  // Forgot Password
  router.patch(
    "/api/v1/password/forgot-password",
    passwordControllers.forgotPasswordToken
  );
  // Reset Password
  router.patch(
    "/api/v1/password/reset-password/:token",
    passwordControllers.resetPassword
  );

  return router;
};

module.exports = { passwordRoute };
