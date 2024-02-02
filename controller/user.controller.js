let jwt = require("jsonwebtoken");
let userModel = require("../database/user");
let response = require("../controller/response");
let bcrypt = require("bcrypt");
let without = require("../controller/without");
let chatRoomModel = require("../database/chatRoom");
let userOnlOffModel = require("../database/userOnlOff");
const chatPrivateModel = require("../database/chatPrivate");
let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5501",
    // origin: "*",
    methods: ["GET", "POST"],
  },
});
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
  let id = req.user._id;
  response.response(res, { username: username, id: id });
};
let getIDUser = (req, res) => {
  console.log(req.user);
  // let id = req.user._id;
  response.response(res, "1");
};
///friend
let addFriend = (req, res) => {
  console.log(req.user);
  // let id = req.user._id;
  response.response(res, "1");
};
let removeFriend = (req, res) => {
  console.log(req.user);
  // let id = req.user._id;
  response.response(res, "1");
};
let loadFriendList = (req, res) => {
  console.log(req.user);
  // let id = req.user._id;
  response.response(res, "1");
};

let getMSGChatRoom = (req, res) => {
  let username = req.user.username;
  let roomName = req.body.nameRoom;
  console.log("zzzzzzzzzzzzzz");
  console.log(roomName);
  chatRoomModel
    .find({ roomName: roomName })
    .sort({ createdAt: -1 })
    .then((data) => {
      let msg = [];
      let date = [];
      let username = [];

      for (let i = 0; i < data.length; i++) {
        let msgTemp = data[i].historyChat;
        let dateTemp = data[i].createdAt;
        let usernameTemp = data[i].username;
        msg.push(msgTemp);
        date.push(dateTemp);
        username.push(usernameTemp);
      }

      response.response(res, { chat: msg, date: date, username: username });
    })
    .catch((err) => {
      response.responseError(res, err, 404);
    });
};
let loadFriendOnline = async (req, res) => {
  // let userOnl = req.body.listUserOnline.usernameOnl;

  let username = req.body.username;
  // let listUserOnline = userOnl.filter((item) => item !== username);
  let listFriend = req.body.listFriend.listFriend;
  // let listUserID = req.body.listFriend.listUserID;
  let listFriendOnline = [];
  for (let i = 0; i < listFriend.length; i++) {
    let friendOnline = await userOnlOffModel
      .findOne({ username: listFriend[i] })
      .sort({ createdAt: -1 });
    if (friendOnline.status == 1) listFriendOnline.push(friendOnline);
  }
  console.log(listFriendOnline);
  response.response(res, listFriendOnline);
};
let getMSGChatPrivate = (req, res) => {
  let usernameReceiver = req.user.username;
  let usernameSender = req.body.usernameSender;
  chatPrivateModel
    .find({
      $or: [
        [
          { usernameReceiver: usernameReceiver },
          { usernameSender: usernameSender },
        ],
        [
          { usernameReceiver: usernameSender },
          { usernameSender: usernameReceiver },
        ],
      ],
    })
    .then((data) => {
      if (!data) {
        chatPrivateModel
          .create({
            codeChatHistory: usernameReceiver + usernameSender,
          })
          .then((data) => {
            response.response(res, data);
          });
      } else {
        let historyChat = [];
        let userChat = [];
        for (let i = 0; i < data.length; i++) {
          let historyChatLoad = data[i].historyChat;
          let userChatLoad = data[i].usernameReceiver;
          historyChat.push(historyChatLoad);
          userChat.push(userChatLoad);
        }
        response.response(res, { historyChat, userChat });
      }
    })
    .catch((err) => {
      response.responseError(res, err, 401);
    });
};
module.exports = {
  createUser,
  getUsername,
  getMSGChatRoom,
  getMSGChatPrivate,
  getIDUser,
  addFriend,
  removeFriend,
  loadFriendList,
  loadFriendOnline,
};
