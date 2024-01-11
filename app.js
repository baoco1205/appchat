///setup server
require("dotenv").config();
let express = require("express");
let app = express();
app.use(express.static("./FE/public"));
let server = require("http").Server(app);
let port = process.env.PORT;
let io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});
var cors = require("cors", {
  cors: {
    origin: "*",
  },
});

// /cors
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // Cho phép các phương thức HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type", "*"); // Cho phép header Content-Type
  console.log("pass cors");
  next();
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./router/routerAll");
let response = require("./controller/response");

///require const
let DatabaseUtil = require("./utils/database.utils");
const checkLogin = require("./controller/check.login");
// /server connect database
DatabaseUtil.connect(function (err) {
  if (err) response.responseErr(res, err, 500);
});
////
//router
app.use("", router);

//socket
io.on("connection", (socket) => {
  console.log("Have user joint: " + socket.id);
  //xu ly gui va nhan tin nhan
  socket.on("sendMSG", (msg) => {
    socket.emit("serverSendMSG", msg);
  });
});
app.use("/home", (req, res) => {});
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
