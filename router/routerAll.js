const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const checkLogin = require("../controller/check.login");
const checkPassport = require("../middleware/check.passport");
router.post("/register", controller.createUser);
router.post("/login", checkLogin);

router.get("/");
router.get("/users/{id}");
router.post("/users");
router.get("/getUsername", checkPassport, controller.getUsername);

module.exports = router;
