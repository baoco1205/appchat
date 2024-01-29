const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const chatSchema = new Schema(
  {
    historyChat: { type: String },
    username: { type: String, min: 1 },
    listUser: { type: String, min: 1 },
    roomName: { type: String, default: 0, min: 1 },
    codeChatHistory: { type: String, default: 0 },
    type: { type: String, default: 0 },
    // index: { type: Number },
  },
  { collection: "chatRoom", timestamps: true }
);

const chatRoomModel = mongoose.model("chatRoom", chatSchema);

module.exports = chatRoomModel;
