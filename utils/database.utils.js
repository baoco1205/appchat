let { DBCONFIG } = require("../const");
let userModel = require("../database/user");
let chatModel = require("../database/chat");
class databaseUtils {
  constructor() {}

  static connect(callback) {
    return this.mongooseConnect(DBCONFIG, callback);
  }
  static mongooseConnect(DBCONFIG, callback) {
    let mongoose = require("mongoose");
    mongoose.Promise = Promise;
    mongoose
      .connect(DBCONFIG.mongodb_connect_str)
      .then(() => console.log("Connected database!"));
    let db = mongoose.connection;
    // this.connection = db;
    db.on("error", (e) => {
      callback(e);
    });
    db.once("open", function () {
      if (callback) {
        callback();
      }
    });
    return db;
  }
}
module.exports = databaseUtils;
