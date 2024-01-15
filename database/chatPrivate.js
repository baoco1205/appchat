const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const chatPrivateSchema = new Schema(
  {
    historyChat: { type: String },
    date: { type: Date, default: NOW },
    usernameReceiver: { type: String, min: 6, max: 20 },
    usernameSender: { type: String, min: 6, max: 20 },
    codeChatHistory: { type: String, defaultCode: 0 },
  },
  { collection: "chatPrivate" }
);
const chatPrivateModel = mongoose.model("chatPrivate", chatPrivateSchema);
module.exports = chatPrivateModel;
