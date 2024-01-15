// All courseCategory services have been imported
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { update } = require("./update");
const { remove } = require("./remove");
const { count } = require("./count");

// All courseCategory services have been exported
module.exports = { create, findAll, findSingle, update, remove, count };
