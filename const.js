let DBCONFIG = require("./config/database");
let now = function () {
  var today = new Date();
  var datetimeVN = today.toLocaleString("vi-VN");
  return datetimeVN;
};
let NOW = now();
let DELETE = { UNDELETED: 0, DELETED: 1 };
module.exports = { DBCONFIG, NOW, DELETE };
