// import { HOME_PAGE, REGISTER_PAGE, LOGIN_PAGE } from "../public/constFE";

var socket = io("http://localhost:3000/");
///xu ly su kien
//gui tin nhan
socket.on("serverSendMSG", (msg) => {
  $("#noiDung").append(msg + "<br>");
});
//xu ly dang ky
socket.on("notificationRegister", (data) => {
  alert(data.message);
  location.href = "http://localhost:3000/login";
});
socket.on("errorRegister", (msg) => {
  alert(msg.message);
});
///xu ly dang nhap
socket.on("loginSuccess", (data) => {
  let token = data.token;
  alert(token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("Bearer Token", token);
  location.href = "http://localhost:3000/homepage";
});
socket.on("errorLogin", (data) => {
  alert(data.message);
});
///
$(document).ready(() => {
  //send msg
  $("#buttonSend").click(() => {
    let msg = $("#boxChat").val();
    console.log(msg);
    socket.emit("sendMSG", msg);
    document.getElementById("boxChat").value = "";
  });
  //send info register
  $("#buttonRegister").click(() => {
    let username = $("#username").val();
    let password = $("#password").val();
    let nickname = $("#nickname").val();
    let name = $("#name").val();
    let confirmPassword = $("#confirmPassword").val();
    if (password !== confirmPassword) {
      alert("Password and confirm password must match !!");
      location.reload();
    }
    socket.emit("register", { username, password, nickname, name });
  });
  //login
  $("#loginButton").click(() => {
    let username = $("#username").val();
    let password = $("#password").val();

    fetch("http://localhost:3000/login", {
      method: "POST",
      // headers: {
      //   token: token,
      //   // Các headers khác nếu cần
      // },
      body: {
        username: username,
        password: password,
        // Dữ liệu cần gửi lên server ở đây
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        localStorage.setItem("bearerToken", token);
        // return response.token;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  $("#linkRegister").click(() => {
    location.href = "http://localhost:3000/register";
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   var input = document.getElementById("boxChat");
//   input.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       document.getElementById("buttonSend").click();
//     }
//   });
// });
