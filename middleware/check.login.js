var jwt = require("jsonwebtoken");
const KEY_TOKEN = process.env.SECRECT;
require("dotenv").config();
const usersModel = require("../database/user");
const bcrypt = require("bcrypt");
const response = require("../controller/response");

var checkLogin = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  usersModel
    .findOne({ username: username })
    .then((data) => {
      if (!data) {
        response.responseError(
          res,
          { message: "WRONG PASSWORD OR USERNAME" },
          400
        );
      }
      if (data.deleted === 1) {
        response.responseError(
          res,
          { message: "Your accounter is deleted" },
          400
        );
      }
      bcrypt.compare(password, data.password, function (err, result) {
        if (err) {
          response.responseError(
            res,
            { message: "WRONG PASSWORD OR USERNAME" },
            400
          );
        }
        if (!result) {
          response.responseError(
            res,
            { message: "WRONG PASSWORD OR USERNAME" },
            400
          );
        }
        var id = data._id.toString();
        let token = jwt.sign({ id }, KEY_TOKEN, {
          expiresIn: "2d",
        });
        const { password, ...other } = data._doc;
        req.user = { data: { ...other }, token: token };
        console.log("pass login");
        next();
      });
    })
    .catch((err) => {
      response.response(res, err, 404);
    });
};

module.exports = checkLogin;
