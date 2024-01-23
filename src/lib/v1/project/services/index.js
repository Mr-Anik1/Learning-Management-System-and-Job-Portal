// All project services have been imported
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findAllForAdmin } = require("./findAllForAdmin");
const { findSingle } = require("./findSingle");
const { findSingleForAdmin } = require("./findSingleForAdmin");
const { update } = require("./update");
const { remove } = require("./remove");
const { count } = require("./count");
const { countForAdmin } = require("./countForAdmin");

// All project services have been exported
module.exports = {
  create,
  findAll,
  findAllForAdmin,
  findSingle,
  findSingleForAdmin,
  update,
  remove,
  count,
  countForAdmin,
};
