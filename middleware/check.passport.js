var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
let userModel = require("../database/user");
var passport = require("passport");
require("dotenv").config();
var opts = {};
const cookieExtractor = function (req) {
  var token = ExtractJwt.fromAuthHeaderAsBearerToken();

  token =
    token(req) ||
    req.cookies["jwt"] ||
    req.headers["authorization"] ||
    req.cookies.token ||
    req.body.token ||
    req.query.token;
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRECT;
let strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  userModel.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});
passport.use(strategy);
let checkPassport = passport.authenticate("jwt", { session: false });
module.exports = checkPassport;
