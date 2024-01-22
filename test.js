// const fs = require("fs");

// // Đọc dữ liệu từ một tệp tin
// const data = fs.readFileSync("vidu.jpg");

// // Mã hóa dữ liệu thành base64
// const base64Data = data.toString("base64");

// console.log("Encoded Data:", base64Data);

// // Giải mã dữ liệu từ base64
// const decodedData = Buffer.from(base64Data, "base64");

// // Ghi dữ liệu giải mã vào một tệp tin mới
// fs.writeFileSync("decoded_example.jpg", decodedData);
// Import các thư viện cần thiết
const mongoose = require("mongoose");
const friendModel = require("./friendModel"); // Đảm bảo rằng bạn đã đặt đúng đường dẫn

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect("mongodb://localhost:27017/your-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Một số ví dụ về cách sử dụng model và schema

// Tạo một bản ghi mới
const newFriend = new friendModel({
  userID1: mongoose.Types.ObjectId(), // Một ObjectId tương ứng với user 1
  userID2: mongoose.Types.ObjectId(), // Một ObjectId tương ứng với user 2
});

// Lưu bản ghi vào cơ sở dữ liệu
newFriend.save((err, savedFriend) => {
  if (err) {
    console.error("Error saving friend:", err);
  } else {
    console.log("Friend saved successfully:", savedFriend);
  }
});

// Truy vấn danh sách bạn bè
friendModel.find({}, (err, friends) => {
  if (err) {
    console.error("Error fetching friends:", err);
  } else {
    console.log("List of friends:", friends);
  }
});

// Truy vấn bạn bè dựa trên điều kiện
const userIdToFind = mongoose.Types.ObjectId("your_user_id_to_find");
friendModel
  .find({
    $or: [{ userID1: userIdToFind }, { userID2: userIdToFind }],
  })
  .populate("userID1") // Thêm thông tin về user 1 vào kết quả truy vấn
  .populate("userID2") // Thêm thông tin về user 2 vào kết quả truy vấn
  .exec((err, friends) => {
    if (err) {
      console.error("Error fetching friends by condition:", err);
    } else {
      console.log("Friends by condition:", friends);
    }
  });

// Đóng kết nối tới cơ sở dữ liệu sau khi hoàn thành các thao tác
mongoose.connection.close();
