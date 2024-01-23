const asyncHandler = require("express-async-handler");
const {
  projectCategoryServicesV1,
} = require("../../../lib/v1/projectCategory");
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

  // Retrive all project categories
  const projectCategories = await projectCategoryServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
  });

  // Pagination
  const totalProjectCategories = await projectCategoryServicesV1.count({
    search,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalProjectCategories,
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
    message: `All Project Categories Retrived Successfully`,
    data: projectCategories,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
