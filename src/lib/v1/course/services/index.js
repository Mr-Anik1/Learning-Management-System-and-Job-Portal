// All course services have been imported
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { update } = require("./update");
const { remove } = require("./remove");
const { count } = require("./count");
const { findAllForAdmin } = require("./findAllForAdmin");
const { countForAdmin } = require("./countForAdmin");
const {
  findSingleForAdminAndInstructor,
} = require("./findSingleForAdminAndInstructor");
const { checkCourseOwnership } = require("./checkCourseOwnership");

// All course services have been exported
module.exports = {
  create,
  findAll,
  findSingle,
  update,
  remove,
  count,
  findAllForAdmin,
  countForAdmin,
  findSingleForAdminAndInstructor,
  checkCourseOwnership,
};
