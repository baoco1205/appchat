require("dotenv").config();
let express = require("express");
let app = express();
let server = require("http").Server(app);
let port = process.env.PORT;
let ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
///require const
let checkLogin = require("./middleware/check.login");
let DatabaseUtil = require("./utils/database.utils");
// /server connect database
DatabaseUtil.connect(function (err) {
  if (err) response.responseError(res, err, 500);
});

app.use("/login", (req, res) => {
  res.render("login.ejs");
});
app.use("/homepage", (req, res) => {
  res.render("index.ejs");
});
server.listen(port, () => {
  console.log("Connect at port:" + port);
});
