///setup server
require("dotenv").config();
let express = require("express");
let app = express();
app.use(express.static("./public"));
let server = require("http").Server(app);
let port = process.env.PORT;
let io = require("socket.io")(server);
app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./router/routerAll");
const checkPassport = require("./middleware/check.passport");

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

app.use("/register", (req, res) => {
  res.render("register.ejs");
});
app.use("/login", (req, res) => {
  res.render("login.ejs");
});

app.use("/homepage", checkPassport, (req, res) => {
  res.render("indextemp.ejs");
});
// app.use("/test", (req, res, next) => {
//   res.render("reqToken.ejs");
// });
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
