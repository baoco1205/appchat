let express = require("express");
const router = express.Router();
let controller = require("../controller/user.controller");
let checkLogin = require("../controller/check.login");
router.post("/register", controller.createUser);
router.post("/login", checkLogin);

module.exports = router;
