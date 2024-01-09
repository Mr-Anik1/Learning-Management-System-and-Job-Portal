const { errors } = require("../../errors");

const notFoundHandler = (req, res, next) => {
  const notFound = new errors.NotFoundError(`Requested Route Doesn't Exist`);

  next(notFound);
};

module.exports = { notFoundHandler };
