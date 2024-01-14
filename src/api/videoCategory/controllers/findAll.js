const asyncHandler = require("express-async-handler");
const { videoCategoryServicesV1 } = require("../../../lib/v1/videoCategory");
const { essentialQuery } = require("../../../utils");
const { StatusCodes } = require("http-status-codes");
const defaults = require("../../../config/defaults");

const findAll = asyncHandler(async (req, res) => {
  // Query Parameters
  const page = +req.query?.page || defaults.page;
  const limit = +req.query?.limit || defaults.limit;
  const sortType = req.query?.sort_type || defaults.sortType;
  const sortBy = req.query?.sort_by || defaults.sortBy;
  const search = req.query?.search || defaults.search;

  // Retrive all video categories
  const videoCategories = await videoCategoryServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
  });

  // Pagination
  const totalVideoCategories = await videoCategoryServicesV1.count({
    search,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalVideoCategories,
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
    message: `All Video Categories Retrived Successfully`,
    data: videoCategories,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
