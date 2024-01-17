///setup server
require("dotenv").config();
let express = require("express");
let app = express();
app.use(express.static("./FE/public"));
let server = require("http").Server(app);
let port = process.env.PORT;
let chatRoomModel = require("./database/chatRoom");
let userOnlOffModel = require("./database/userOnlOff");
let { CHECK_ONL } = require("./const");
let { NOW } = require("./const");
// let socketConfig = require("./socket.io/socket");
// app.use(socketConfig);
var cors = require("cors", {
  cors: {
    origin: "*",
  },
});
app.use(cors());
let io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5501",
    // origin: "*",
    methods: ["GET", "POST"],
  },
});

// /cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // Cho phép các phương thức HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type", "*"); // Cho phép header Content-Type
  next();
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./router/routerAll");
let response = require("./controller/response");
////Bat loi
app.use((err, req, res, next) => {
  var statusCode = err.statusCode;
  var message = err.messageErr;
  res.status(statusCode).json(message);
});

///require const
let DatabaseUtil = require("./utils/database.utils");
const userModel = require("./database/user");
// const checkLogin = require("./controller/check.login");
// const { userInfo } = require("os");
// /server connect database
DatabaseUtil.connect(function (err) {
  if (err) response.responseErr(res, err, 500);
});
////
//router
app.use("", router);

//socket
//server xu ly chat
io.on("connection", (socket) => {
  console.log("Have user joint: " + socket.id);
  //xu ly gui va nhan tin nhan
  socket.on("sendMSG", (msg) => {
    // console.log(msg); // trong msg gồm username và msg

    chatRoomModel
      .create({
        historyChat: msg.msg,
        date: NOW,
        username: msg.username,
      })
      .then((data) => {
        ///
        chatRoomModel
          .find({})
          .sort({ createdAt: -1 })
          .then((data) => {
            let historyChatTemp = [];
            for (let i = 0; i < data.length; i++) {
              let chat = data[i].historyChat;
              historyChatTemp.push(chat);
            }
            console.log(historyChatTemp);
            io.sockets.emit("serverSendMSG", msg);
          })
          .catch((err) => {
            console.log(err);
          });
        ///
        // io.sockets.emit("serverSendMSG", msg);
      })
      .catch((err) => {});
  });
  ///// send img
  socket.on("sendIMG", (img) => {});
  ///// tra lai list tat ca nguoi dung da dang ki
  socket.on("loadAllUser", () => {
    userModel
      .find({})
      .then((data) => {
        let allUsername = [];
        let allID = [];
        for (let i = 0; i < data.length; i++) {
          let usernameTemp = data[i].username;
          let idTemp = data[i]._id.toString();
          allUsername.push(usernameTemp);
          allID.push(idTemp);
        }
        socket.emit("serverSendAllUser", { username: allUsername, id: allID });
      })
      .catch((err) => {});
  });
  ///// thong bao nguoi dung nao dang online
  socket.on("notificationOnl", (userInfor) => {
    let username = userInfor.username;
    let token = userInfor.token;
    //check xem nguoi dung da online chua.
    userOnlOffModel
      .findOne({ username: username, token: token })
      .then((data) => {
        //neu db khong co du lieu dang onl.
        //tao 1 status online cho ng dung
        if (!data) {
          userOnlOffModel
            .create({
              username: username,
              token: token,
              status: CHECK_ONL.ONL,
            })
            .then((data1) => {
              let username = data1.username;
              userOnlOffModel.find({ status: CHECK_ONL.ONL }).then((data) => {
                //lay danh sach nhung nguoi dang online bang status

                let usernameOnl = [];
                for (let i = 0; i < data.length; i++) {
                  let usernameTemp = data[i].username;
                  usernameOnl.push(usernameTemp);
                }

                userModel
                  .find({ username: { $in: usernameOnl } })
                  .then((dataUser) => {
                    let getUsername = [];
                    let getIDUser = [];
                    console.log("vao day");
                    // console.log("testttqwzxqawe: " + dataUser);
                    for (let i = 0; i < dataUser.length; i++) {
                      let getUsernameTemp = dataUser[i].username;
                      let getIDUserTemp = dataUser[i]._id.toString();
                      getUsername.push(getUsernameTemp);
                      getIDUser.push(getIDUserTemp);
                    }
                    console.log(getUsername);
                    console.log(getIDUser);
                    io.sockets.emit("serverNotificationOnl", {
                      usernameOnl: getUsername,
                      userID: getIDUser,
                    });
                  });
              });
            })
            .catch((err) => {
              response.responseError(res, err, 405);
            });
        } else {
          /// xử lý lúc user đã có trong data vẫn trả về mảng các tk đã đăng nhập
          userOnlOffModel.find({ status: 1 }).then((data) => {
            console.log("vao cai nay phai k ");

            let usernameOnl = [];
            let userID = [];
            for (let i = 0; i < data.length; i++) {
              let usernameTemp = data[i].username;
              let IDTemp = data[i]._id.toString();
              usernameOnl.push(usernameTemp);
              userID.push(IDTemp);
            }
            io.sockets.emit("serverNotificationOnl", {
              usernameOnl: usernameOnl,
              userID: userID,
            });
          });
        }
      })
      .catch((err) => {
        response.responseError(res, err, 405);
      });
  });

  ////thong bao nguoi dung offline
  socket.on("notificationOff", (userOff) => {
    let token = userOff.token;
    let username = userOff.username;
    userOnlOffModel
      .find({ username: username, token: token })
      .then((data) => {
        if (!data) {
          console.log("Client do something not true :( ");
          let msgErr = "Have some err at Server";
          response.responseError(res, { msgErr }, 404);
        }
        userOnlOffModel
          .findOneAndUpdate(
            { username: username, token: token },
            { $set: { status: CHECK_ONL.OFF } },
            { new: true }
          )
          .then((data) => {
            if (!data) {
              console.log("loi o server roi. ko update status onl dc ");
              let msgErr = "Have some err at Server";
              response.responseError(res, { msgErr }, 404);
            }
            userOnlOffModel.find({ status: CHECK_ONL.ONL }).then((data) => {
              let usernameOnl = [];
              let userID = [];
              for (let i = 0; i < data.length; i++) {
                let usernameTemp = data[i].username;
                let idTemp = data[i].username;
                usernameOnl.push(usernameTemp);
                userID.push(idTemp);
              }
              socket.broadcast.emit("serverNotificationOnl", {
                usernameOnl: usernameOnl,
                userID: userID,
              });
            });
          });
      })
      .catch((err) => {
        response.responseError(res, err, 405);
      });
  });
  //
});

server.listen(port, () => {
  console.log("Connect at port:" + port);
});
