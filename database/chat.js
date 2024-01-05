const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const chatSchema = new Schema(
  {
    historyChat: { type: String },
    time: { type: String, min: 6, max: 20 },
    date: { type: Date, default: NOW },
    username: { type: String, min: 6, max: 20 },
  }
  // { collection: "chatHistory" }
);
const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
