var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
let userModel = require("../database/user");
var passport = require("passport");
require("dotenv").config();
var opts = {};
const cookieExtractor = function (req) {
  var token = ExtractJwt.fromAuthHeaderAsBearerToken();
  console.log(token);
  token =
    token(req) ||
    req.header["token"] ||
    req.cookies["jwt"] ||
    req.headers["authorization"] ||
    req.cookies.token ||
    req.body.token ||
    req.query.token ||
    null;
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRECT;
let strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  console.log("test id:" + jwt_payload.id);
  let id = jwt_payload.id;
  userModel
    .findById(id)
    .then((user) => {
      if (user) {
        console.log("tesst dong nay");
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});
passport.use(strategy);
let checkPassport = passport.authenticate("jwt", { session: false });
module.exports = checkPassport;
