let multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, "./upload");
    } else {
      cb(new Error(`File upload must ".jpg" or ".jpeg".`));
    }
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname); // lưu tên file theo tên người dùng đăng
    cb(null, Date.now() + ".jpg"); // lưu tên file theo ngày đăng
  },
});
let upload = multer({ storage: storage });
module.exports = upload;
