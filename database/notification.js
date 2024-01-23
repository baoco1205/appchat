const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW } = require("../const");

const notificationSchema = new Schema(
  {
    whoAddMe: { type: String, min: 1 },
    whoAcceptMe: { type: String, min: 1 },
    msg: { type: String, min: 1 },
    someOneAcept: { type: String, min: 1 },
    username: { type: String, min: 1 },

    // index: { type: Number },
  },
  { collection: "notification", timestamps: true }
);

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;
