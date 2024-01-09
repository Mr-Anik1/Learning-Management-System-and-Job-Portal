const { health } = require("../api/healthCheck");

const healthRoute = (router) => {
  router.get("/", health);
  return router;
};

module.exports = { healthRoute };
