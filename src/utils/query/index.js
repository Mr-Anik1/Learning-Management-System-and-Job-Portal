// All queries have been imported
const { getHateOASforAllItems } = require("./hateoasLinks");
const { getPagination } = require("./pagination");
const { generateQueryString } = require("./queryString");

// All queries have been exported
module.exports = { getHateOASforAllItems, getPagination, generateQueryString };
