const { generateQueryString } = require("./queryString");

const getHateOASforAllItems = ({
  baseUrl = "/",
  reqQuery = {},
  page = 1,
  hasNext = false,
  hasPrev = false,
}) => {
  const links = {
    self: `${baseUrl}?${generateQueryString({
      ...reqQuery,
    })}`,
  };

  if (hasNext) {
    const query = generateQueryString({
      ...reqQuery,
      page: page + 1,
    });
    links.next = `${baseUrl}?${query}`;
  }

  if (hasPrev) {
    const query = generateQueryString({
      ...reqQuery,
      page: page - 1,
    });
    links.prev = `${baseUrl}?${query}`;
  }

  return links;
};

module.exports = { getHateOASforAllItems };
