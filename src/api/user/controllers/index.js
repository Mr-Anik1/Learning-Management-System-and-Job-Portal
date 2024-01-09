// All user controllers have been imported
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { update } = require("./update");
const { remove } = require("./remove");

// All user controllers have been exported
module.exports = { findAll, findSingle, update, remove };
