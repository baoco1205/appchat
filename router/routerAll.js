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
router.get("/users/{id}");
router.post("/users");
router.get("/get_username", checkPassport, controller.getUsername);
router.post("/upload_file", upload.single("file"), (req, res) => {
  console.log("Upload success");
  response.response(res, req.file);
});

module.exports = router;
