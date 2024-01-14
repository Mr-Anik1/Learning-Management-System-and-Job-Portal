const asyncHandler = require("express-async-handler");
const { documentationServicesV1 } = require("../../../lib/v1/documentation");
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
  const category = req.query?.category || defaults.category;

  // Retrive all documentations
  const documentations = await documentationServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    category,
  });

  // Pagination
  const totalDocumentations = await documentationServicesV1.count({
    search,
    category,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalDocumentations,
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
    message: `Documentations Retrived Successfully`,
    data: documentations,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
