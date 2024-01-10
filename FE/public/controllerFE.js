// import { HOME_PAGE, REGISTER_PAGE, LOGIN_PAGE } from "../public/constFE";

var socket = io("http://localhost:3000/");
///xu ly su kien
//gui tin nhan
socket.on("serverSendMSG", (msg) => {
  $("#noiDung").append(msg + "<br>");
});
//xu ly dang ky

///xu ly dang nhap
socket.on("loginSuccess", (data) => {
  let token = data.token;
  alert(token);

  localStorage.setItem("Bearer Token", token);
  location.href = "http://localhost:3000/homepage";
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
    if (username == "" || password == "" || name == "") {
      alert("Field have (*) not null!!");
      location.reload();
    }
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        nickname: nickname,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          if (response.status === 400) {
            alert("Dupllicated username");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("register success");
        location.href = "http://localhost:3000/login";
        // axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        // localStorage.setItem("bearerToken", reponse.token);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  //login

  $("#linkRegister").click(() => {
    location.href = "http://127.0.0.1:5500/FE/views/register.html";
    window.location.href = "http://127.0.0.1:5500/FE/views/register.html";
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
