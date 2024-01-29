const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const chatPrivateSchema = new Schema(
  {
    historyChat: { type: String },
    usernameReceiver: { type: String, min: 1, max: 20 },
    usernameSender: { type: String, min: 1, max: 20 },
    codeChatHistory: { type: String, default: 0 },
    type: { type: Number, default: 0 },
  },
  { collection: "chatPrivate", timestamps: true }
);
const chatPrivateModel = mongoose.model("chatPrivate", chatPrivateSchema);
module.exports = chatPrivateModel;
