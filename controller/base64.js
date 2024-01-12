let base64 = (img, path) => {
  const fs = require("fs");
  // Đọc dữ liệu từ một tệp tin
  const data = fs.readFileSync(img);
  // Mã hóa dữ liệu thành base64
  const base64Data = data.toString("base64");
  //   console.log("Encoded Data:", base64Data);
  // Giải mã dữ liệu từ base64
  const decodedData = Buffer.from(base64Data, "base64");
  // Ghi dữ liệu giải mã vào một tệp tin mới
  fs.writeFileSync("decoded_example.jpg", decodedData);
};
module.exports = base64;
