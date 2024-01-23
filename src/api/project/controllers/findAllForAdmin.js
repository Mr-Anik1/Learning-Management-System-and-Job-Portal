const asyncHandler = require("express-async-handler");
const { projectServicesV1 } = require("../../../lib/v1/project");
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
  const author = req.query?.author || defaults.author;

  // Retrive all projects for admin
  const projects = await projectServicesV1.findAllForAdmin({
    page,
    limit,
    sortType,
    sortBy,
    search,
    category,
    status,
    author,
  });

  // Pagination
  const totalProjects = await projectServicesV1.countForAdmin({
    search,
    category,
    status,
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

module.exports = { findAllForAdmin };
