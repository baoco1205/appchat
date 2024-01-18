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
    roomName: { type: String, default: 0 },
    codeChatHistory: { type: String, default: 0 },
    // index: { type: Number },
  },
  { collection: "chatRoom", timestamps: true }
);

const chatRoomModel = mongoose.model("chatRoom", chatSchema);
/////

// chatSchema.pre("save", function (next) {
//   var doc = this;
//   console.log("TÉTTSTSTSTST");
//   chatRoomModel
//     .findOne({})
//     .sort("-index")
//     .exec(function (err, last) {
//       if (doc.index > 0) {
//         next();
//         return;
//       }
//       if (err || last == null) {
//         doc.index = 1;
//       } else {
//         doc.index = last.index + 1;
//       }
//       next();
//     });
// });

///

// chatSchema.pre("save", async function (next) {
//   console.log("tjkqbwjkbduhbqwlkne");
//   try {
//     if (!this.index) {
//       const lastDocument = await chatRoomModel.findOne({}).sort("-index");

//       if (lastDocument) {
//         this.index = lastDocument.index + 1;
//       } else {
//         this.index = 1;
//       }
//     }

//     console.log("TÉTTSTSTSTST");
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = chatRoomModel;
