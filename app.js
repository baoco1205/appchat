require("dotenv").config();
let express = require("express");
let app = express();
app.use(express.static("./public"));
let server = require("http").Server(app);
let port = process.env.PORT;
let io = require("socket.io")(server);
let userModel = require("./database/user");
let checkPassport = require("./middleware/check.passport");
let bcrypt = require("bcrypt");
let response = require("./controller/response");
let jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.set("views", "./views");

///require const
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
    if (!data.username || !data.password || !data.name) {
      socket.emit("errorRegister", {
        message: "username,password and username don't empty",
      });
    }
    if ((data.username, data.password, data.nickname, data.name)) {
      const saltRounds = 10;
      bcrypt.hash(data.password, saltRounds, function (err, hash) {
        userModel
          .create({
            username: data.username,
            password: hash,
            nickname: data.nickname,
            name: data.name,
          })
          .then((data) => {
            const { password, ...other } = data._doc;
            socket.emit("notificationRegister", {
              message: "Register success",
              data: other,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
  //xu ly dang nhap
  socket.on("login", (data) => {
    let username = data.username;
    let password = data.password;

    userModel
      .findOne({ username: username })
      .then((data) => {
        if (!data) {
          let message = "Wrong password or username";
          socket.emit("errorLogin", { message });
        }
        bcrypt
          .compare(password, data.password)
          .then(function (result) {
            let message = "login success";
            let id = data._id.toString();
            var token = jwt.sign({ id }, process.env.SECRECT);
            console.log("Pass login");
            return socket.emit("loginSuccess", { token: token });
          })
          .catch((err) => {
            let message = "Wrong password or username111";
            socket.emit("errorLogin", { message });
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
