const asyncHandler = require("express-async-handler");
const { blogServicesV1 } = require("../../../lib/v1/blog");
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

  // Retrive all blogs
  const blogs = await blogServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    category,
  });

  // Pagination
  const totalBlogs = await blogServicesV1.count({
    search,
    category,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalBlogs,
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
    message: `All Blogs Retrived Successfully`,
    data: blogs,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
