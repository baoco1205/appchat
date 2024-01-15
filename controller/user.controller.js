let jwt = require("jsonwebtoken");
let userModel = require("../database/user");
let response = require("../controller/response");
let bcrypt = require("bcrypt");
let without = require("../controller/without");
let chatRoomModel = require("../database/chatRoom");
let createUser = (req, res) => {
  var { username, password, name, nickname } = req.body;
  console.log(req.body);
  userModel
    .findOne({ username: username })
    .then((data) => {
      if (data) {
        return response.responseError(res, "dupllicated username", 400);
      } else {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            userModel
              .create({
                username: username,
                password: hash,
                name: name,
                nickname: nickname,
              })
              .then((data) => {
                const user = without.withoutPassword(data);
                console.log("Create success");
                return response.response(res, user, "CREATE SUCCESS");
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log("err:   " + err);
      return response.responseError(res, err, 500);
    });
};
let getUsername = (req, res) => {
  let username = req.user.username;
  response.response(res, username);
};
let getMSGChatRoom = (req, res) => {
  let username = req.user.username;
  chatRoomModel
    .find({ username: username })
    .then((data) => {
      let msg = [];
      let date = [];
      for (let i = 0; i < data.length; i++) {
        let msgTemp = data[i].historyChat;
        let dateTemp = data[i].date;
        msg.push(msgTemp);
        date.push(dateTemp);
      }

      response.response(res, { chat: msg, date: date });
    })
    .catch((err) => {
      response.responseError(res, err, 404);
    });
};
let checkHistoryChat = (req, res) => {
  username1 = req.user.username;
  username2 = req.body.usernameNeedChat;
  chatRoomModel
    .find({ username: { $in: [username1, username2] } })
    .then((data) => {
      let codeName1 = username1 + username2;
      let codeName2 = username2 + username1;
      for (let i = 0; i < data.length; i++) {
        let codeChat = data[i].codeChatHistory;
        if (
          data.codeChatHistory.includes(codeName1) ||
          data.codeChatHistory.includes(codeName2)
        ) {
          let userChat1 = [];
          let userChat2 = [];
          //Tra ve cac data chat cua user1 va user2.
        } else {
        }
      }
    })
    .catch((err) => {
      responseError(res, err, 405);
    });
};
module.exports = { createUser, getUsername, getMSGChatRoom, checkHistoryChat };
