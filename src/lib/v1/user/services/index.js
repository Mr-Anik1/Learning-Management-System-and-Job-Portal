// All user srvices have been imported
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { update } = require("./update");
const { remove } = require("./remove");
const { userExist, findUserByEmail, findUserById } = require("./checkUser");
const { count } = require("./count");
const { checkUserOwnership } = require("./checkUserOwnership");

// All user srvices have been exported
module.exports = {
  create,
  findAll,
  findSingle,
  update,
  remove,
  userExist,
  findUserByEmail,
  findUserById,
  count,
  checkUserOwnership,
};
