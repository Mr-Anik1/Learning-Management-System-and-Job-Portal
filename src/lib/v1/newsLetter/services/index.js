// All news letter services have been imported
const { subscribe } = require("./subscribe");
const { unsubscribe } = require("./unsubscribe");
const { findAll } = require("./findAll");
const { count } = require("./count");

// All news letter services have been exported
module.exports = { subscribe, unsubscribe, findAll, count };
