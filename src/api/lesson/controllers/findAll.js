const asyncHandler = require("express-async-handler");
const { lessonServicesV1 } = require("../../../lib/v1/lesson");
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

  // Retrive all lessons
  const lessons = await lessonServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    category,
  });

  // Pagination
  const totalLessons = await lessonServicesV1.count({
    search,
    category,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalLessons,
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
    message: `All Lessons Retrived Successfully`,
    data: lessons,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
