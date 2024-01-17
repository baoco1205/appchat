const { Collection } = require("mongodb");
const mongoose = require("mongoose");
let { DBCONFIG } = require("../const");
const Schema = mongoose.Schema;
const { NOW, DELETE } = require("../const");

const friendListSchema = new Schema(
  {
    username: { type: String, min: 1, max: 20 },
    friend: { type: String, min: 1 },
  },
  { collection: "friendList", timestamps: true }
);
const friendListModel = mongoose.model("friendList", friendListSchema);
module.exports = friendListModel;
