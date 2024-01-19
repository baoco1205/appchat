const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const nameChatSchema = new Schema(
  {
    historyChat: { type: String },
    userCreate: { type: String, min: 1 },
    roomName: { type: String, default: 0, min: 1 },
    usernameReceiver: { type: String, min: 1, max: 20 },
    usernameSender: { type: String, min: 1, max: 20 },
    privateName: { type: String, default: 0, min: 1 },
  },
  { collection: "nameChat", timestamps: true }
);

const nameChatModel = mongoose.model("nameChat", nameChatSchema);

module.exports = nameChatModel;
