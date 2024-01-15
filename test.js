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
let CODE_CHAT = (username1, username2) => {
  var today = new Date();
  var nowVN = new Date(today.getTime() + 7 * 60 * 60 * 1000);
  let codeChat = nowVN + username1 + username2;
  return codeChat;
};
let indongnay = CODE_CHAT("ABCC", "JQHBWEKNQWE");
console.log(indongnay);
