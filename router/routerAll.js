const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const checkLogin = require("../controller/check.login");
const checkPassport = require("../middleware/check.passport");
const upload = require("../controller/uploadFile");
const response = require("../controller/response");

router.post("/register", controller.createUser);
router.post("/login", checkLogin);
router.get("/");
router.post("/users");
router.get("/get_username", checkPassport, controller.getUsername);

router.post("/upload_file", upload.single("file"), (req, res) => {
  if (req.file === undefined) {
    response.responseError(res, "Don't empty file", 412);
  }
  response.response(res, req.file);
  console.log("Upload success");
});
///Chat
router.get("/load_msg_room", checkPassport, controller.getMSGChatRoom);
router.get("/load_msg_private", checkPassport, controller.getMSGChatPrivate);

module.exports = router;
