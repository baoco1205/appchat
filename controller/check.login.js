var jwt = require("jsonwebtoken");
const KEY_TOKEN = process.env.SECRECT;
require("dotenv").config();
const usersModel = require("../database/user");
const bcrypt = require("bcrypt");
const response = require("./response");

var checkLogin = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  usersModel
    .findOne({ username: username })
    .then((data) => {
      if (!data) {
        return response.responseError(
          res,
          { message: "WRONG PASSWORD OR USERNAME" },
          400
        );
      }
      if (data.deleted === 1) {
        return response.responseError(
          res,
          { message: "Your accounter is deleted" },
          400
        );
      }
      bcrypt.compare(password, data.password, function (err, result) {
        if (err) {
          return response.responseError(
            res,
            { message: "WRONG PASSWORD OR USERNAME" },
            400
          );
        }
        if (!result) {
          return response.responseError(
            res,
            { message: "WRONG PASSWORD OR USERNAME" },
            400
          );
        }
        var id = data._id.toString();
        let token = jwt.sign({ id }, KEY_TOKEN, {
          expiresIn: "365d",
        });
        const { password, ...other } = data._doc;
        // req.user = { data: { ...other }, token: token };
        console.log("pass login");
        console.log(req.headers);
        return res.json({ message: "login success", token: token });
      });
    })
    .catch((err) => {
      response.response(res, err, 404);
    });
};

module.exports = checkLogin;
