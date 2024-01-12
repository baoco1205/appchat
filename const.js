let DBCONFIG = require("./config/database");
let now = function () {
  var today = new Date();
  var nowVN = new Date(today.getTime() + 7 * 60 * 60 * 1000);
  return nowVN;
};
let NOW = now();
let DELETE = { UNDELETED: 0, DELETED: 1 };
module.exports = { DBCONFIG, NOW, DELETE };
