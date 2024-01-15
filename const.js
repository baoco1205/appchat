let DBCONFIG = require("./config/database");
let now = function () {
  var today = new Date();
  var nowVN = new Date(today.getTime() + 7 * 60 * 60 * 1000);
  return nowVN;
};
let NOW = now();
///codeChat
let CODE_CHAT = (username1, username2) => {
  var today = new Date();
  var nowVN = new Date(today.getTime() + 7 * 60 * 60 * 1000);
  let codeChat = nowVN + username1 + username2;
  return codeChat;
};
let CHECK_ONL = { OFF: 0, ONL: 1 };
let DELETE = { UNDELETED: 0, DELETED: 1 };
module.exports = { DBCONFIG, NOW, DELETE, CODE_CHAT, CHECK_ONL };
