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
const checkLogin = require("./controller/check.login");
const { userInfo } = require("os");
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
        io.sockets.emit("serverSendMSG", msg);
      })
      .catch((err) => {});
  });
  ///// send img
  socket.on("sendIMG", (img) => {});
  ///// thong bao nguoi dung nao dang onl
  socket.on("notificationOnl", (userInfor) => {
    userOnlOffModel
      .findOne({ username: userInfor.username, token: userInfor.token })
      .then((data) => {
        if (!data) {
          userOnlOffModel
            .create({
              username: userInfor.username,
              token: userInfo.token,
              status: CHECK_ONL.ONL,
            })
            .then((data1) => {
              let username = data1.username;
              socket.emit("serverNotificationOnl", { username });
            })
            .catch((err) => {
              response.responseError(res, err, 405);
            });
        }
      })
      .catch((err) => {});
    // io.sockets.emit("notificationOff", userOnOff);
  });
  ////
});
app.use("/home", (req, res) => {});
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
