const asyncHandler = require("express-async-handler");
const { courseServicesV1 } = require("../../../lib/v1/course");
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
  const category = req.query?.category || defaults.category;
  const status = req.query?.status || defaults.status;
  const paid = req.query?.paid || defaults.paid;

  // Retrive all courses for admin
  const courses = await courseServicesV1.findAllForAdmin({
    page,
    limit,
    sortType,
    sortBy,
    search,
    status,
    category,
    paid,
  });

  // Pagination
  const totalCourses = await courseServicesV1.countForAdmin({
    search,
    status,
    category,
    paid,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalCourses,
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
    message: `All Courses Retrived Successfully`,
    data: courses,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAllForAdmin };
