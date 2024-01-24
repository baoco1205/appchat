const { Collection } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
    userID1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userID2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "friend", timestamps: true }
);
const friendModel = mongoose.model("friend", friendSchema);
module.exports = friendModel;
