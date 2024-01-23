const asyncHandler = require("express-async-handler");
const { projectServicesV1 } = require("../../../lib/v1/project");
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
  const author = req.query?.author || defaults.author;

  // Retrive all projects
  const projects = await projectServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    category,
    author,
  });

  // Pagination
  const totalProjects = await projectServicesV1.count({
    search,
    category,
    author,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalProjects,
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
    message: `All Projects Retrived Successfully`,
    data: projects,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
