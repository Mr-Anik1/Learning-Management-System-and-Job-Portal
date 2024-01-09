const { StatusCodes } = require("http-status-codes");
const { userServicesV1 } = require("../../../lib/v1/user");
const { essentialQuery } = require("../../../utils");
const asyncHandler = require("express-async-handler");
const defaults = require("../../../config/defaults");

const findAll = asyncHandler(async (req, res) => {
  // Query Parameters
  const page = +req.query?.page || defaults.page;
  const limit = +req.query?.limit || defaults.limit;
  const sortType = req.query?.sort_type || defaults.sortType;
  const sortBy = req.query?.sort_by || defaults.sortBy;
  const search = req.query?.search || defaults.search;
  const status = req.query?.status || defaults.status;

  // Retrive all users
  const users = await userServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    status,
  });

  // Pagination
  const totalUsers = await userServicesV1.count({ search, status });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalUsers,
  });

  // links
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
    message: "Users Retrived Successfully",
    data: users,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
