let DBCONFIG = require("./config/database");
let now = function () {
  var today = new Date();
  var datetimeVN = today.toLocaleString("vi-VN");
  return datetimeVN;
};
let NOW = now();

module.exports = { DBCONFIG, NOW };
