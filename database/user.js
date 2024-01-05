const { Collection } = require("mongodb");
const mongoose = require("mongoose");
let { DBCONFIG } = require("../const");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const userSchema = new Schema(
  {
    username: { type: String, min: 6, max: 20 },
    password: { type: String, min: 6, max: 20 },
    date: { type: Date, default: NOW },
    nickname: { type: String, min: 2, max: 20, match: /^[a-zA-Z0-9]{2,20}$/ },
    name: { type: String, min: 2, max: 20 },
  }
  // { collection: "users" }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
