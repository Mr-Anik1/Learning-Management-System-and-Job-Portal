// All course controllers have been imported
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { update } = require("./update");
const { remove } = require("./remove");
const { findAllForAdmin } = require("./findAllForAdmin");
const {
  findSingleForAdminAndInstructor,
} = require("./findSingleForAdminAndInstructor");

// All course controllers have been exported
module.exports = {
  create,
  findAll,
  findSingle,
  update,
  remove,
  findAllForAdmin,
  findSingleForAdminAndInstructor,
};
