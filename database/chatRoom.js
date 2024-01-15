const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const chatSchema = new Schema(
  {
    historyChat: { type: String },
    date: { type: Date, default: NOW },
    username: { type: String, min: 6, max: 20 },
    roomName: { type: String, default: 0 },
    codeChatHistory: { type: String, default: 0 },
  },
  { collection: "chatRoom" }
);
const chatRoomModel = mongoose.model("chatRoom", chatSchema);
module.exports = chatRoomModel;
