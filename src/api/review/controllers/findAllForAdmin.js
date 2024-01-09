const asyncHandler = require("express-async-handler");
const { reviewServicesV1 } = require("../../../lib/v1/review");
const { essentialQuery } = require("../../../utils");
const { StatusCodes } = require("http-status-codes");
const defaults = require("../../../config/defaults");

const findAllForAdmin = asyncHandler(async (req, res) => {
  // Query Parameters
  const page = +req.query?.page || defaults.page;
  const limit = +req.query?.limit || defaults.limit;
  const sortType = req.query?.sort_type || defaults.sortType;
  const sortBy = req.query?.sort_by || defaults.sortBy;
  const search = req.query?.search || defaults.search;
  const status = req.query?.status || defaults.status;

  // Retrive all reviews for only admin
  const reviews = await reviewServicesV1.findAllForAdmin({
    page,
    limit,
    sortType,
    sortBy,
    search,
    status,
  });

  // Pagination
  const totalReviews = await reviewServicesV1.countForAdmin({
    search,
    status,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalReviews,
  });

  // Generate Links
  const links = essentialQuery.getHateOASforAllItems({
    baseUrl: req.url.split("?")[0],
    reqQuery: req.query,
    page,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `All Reviews Retrived Successfully`,
    data: reviews,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAllForAdmin };
