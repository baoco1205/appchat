const { Collection } = require("mongodb");
let { DBCONFIG } = require("../const");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { NOW, CHECK_ONL } = require("../const");

const onlOffSchema = new Schema(
  {
    username: { type: String, min: 6, max: 20 },
    token: { type: String },
    status: {
      type: Number,
      default: CHECK_ONL.OFF,
      enum: [CHECK_ONL.OFF, CHECK_ONL.ONL],
    },
  },
  { collection: "userOnlOff" }
);
const onlOffModel = mongoose.model("userOnlOff", onlOffSchema);
module.exports = onlOffModel;
