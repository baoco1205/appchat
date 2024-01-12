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
var today = new Date();

var utcPlus7Date = new Date(today.getTime() + 7 * 60 * 60 * 1000);

console.log("Ngày và giờ hiện tại:", today.toISOString());
console.log("Ngày và giờ ở UTC+7:", utcPlus7Date.toISOString());
