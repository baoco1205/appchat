let express = require("express");
let app = express();
let socket = require("socket.io");
let server = require("http").Server(app);
app.use(socket);
var cors = require("cors", {
  cors: {
    origin: "*",
  },
});
app.use(cors());
let io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5501",
    // origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Have user joint: " + socket.id);
  //xu ly gui va nhan tin nhan
  socket.on("sendMSG", (msg) => {
    console.log(msg);
    io.sockets.emit("serverSendMSG", msg);
  });
});

module.exports = socket;
