const defaults = require("../../config/defaults");

const getPagination = ({
  page = defaults.page,
  limit = defaults.limit,
  totalItems = defaults.totalItems,
}) => {
  const totalPage = Math.ceil(totalItems / limit);

  // Pagination Object
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  // If the number of pages is less than the total number of pages, that means the next page exists.
  if (page < totalPage) {
    pagination.next = page + 1;
  }

  // If page = 3, it will enter the if block, and the result will be prev = 2, but if page = 1, then it will not enter the if block.
  if (page > 1) {
    pagination.prev = page - 1;
  }

  // return final pagination
  return pagination;
};

module.exports = { getPagination };
