let jwt = require("jsonwebtoken");
let userModel = require("../database/user");
let response = require("../controller/response");
let bcrypt = require("bcrypt");
let without = require("../controller/without");
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
let getUsername = () => {};
module.exports = { createUser, getUsername };
