require("dotenv").config();
let express = require("express");
let app = express();
app.use(express.static("./public"));
let server = require("http").Server(app);
let port = process.env.PORT;
let io = require("socket.io")(server);
let userModel = require("./database/user");

app.set("view engine", "ejs");
app.set("views", "./views");

///require const
let checkLogin = require("./middleware/check.login");
let DatabaseUtil = require("./utils/database.utils");
// /server connect database
DatabaseUtil.connect(function (err) {
  if (err) response.responseError(res, err, 500);
});
////
io.on("connection", (socket) => {
  console.log("Have user joint: " + socket.id);
  //xu ly gui va nhan tin nhan
  socket.on("sendMSG", (msg) => {
    socket.emit("serverSendMSG", msg);
  });

  //xu ly dang ky
  socket.on("register", (data) => {
    if (data.username == "" || data.password == "" || data.name === "") {
      socket.emit(
        "errorRegister",
        "username,password and username don't empty"
      );
    }
    if ((data.username, data.password, data.nickname, data.name)) {
      userModel
        .create({
          username: data.username,
          password: data.password,
          nickname: data.nickname,
          name: data.name,
        })
        .then((data) => {
          let messsage = "create success";
          socket.emit("notificationRegister", messsage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
app.use("/register", (req, res) => {
  res.render("register.ejs");
});
app.use("/login", (req, res) => {
  res.render("login.ejs");
});
app.use("/homepage", (req, res) => {
  res.render("indextemp.ejs");
});
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
