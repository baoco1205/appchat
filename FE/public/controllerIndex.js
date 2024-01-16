var socket = io("http://localhost:3000/");
let token = localStorage.getItem("token");
$(document).ready(() => {
  console.log(token);

  /////
  document
    .getElementById("uploadForm")
    .addEventListener("submit", function (event) {
      e.preventDefault();
    });
  /////
  $("#uploadForm").on("submit", (e) => {
    var formdata = new FormData();
    // e.preventDefault();
    var requestOptions = {
      method: "POST",
      // headers: myHeaders,
      body: formdata,
      // redirect: "follow",
    };

    fetch("http://localhost:3000/upload_file", requestOptions)
      .then((response) => {
        console.log("TESTT");
        response.json();
      })
      .then((result) => {
        console.log("TESTT");
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  });

  fetch("http://localhost:3000/get_username", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      if (data.status === 401) {
        alert("Login session has expired");
        location.href = "http://127.0.0.1:5501/views/login.html";
      }

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(data);

      return data.json();
    })
    .then((user) => {
      let username = user.data;

      /////notification user online
      socket.emit("notificationOnl", { username, token });
      socket.on("serverNotificationOnl", (listUserOnline) => {
        console.log(listUserOnline.userNameOnl);
        let arrayUsernameOnl = listUserOnline.userNameOnl;
        for (const username of arrayUsernameOnl) {
          // console.log(username);
          $("#userList").empty();
          $("#userList").append(`<li>${username}</li>`);
        }
      });

      /////notification user offline
      ///logout
      $("#logout").click(() => {
        socket.emit("notificationOff", { username, token });
        localStorage.removeItem("token");
        location.href = "http://127.0.0.1:5501/views/login.html";
      });

      /////hien thi username dang dang nhap
      $("#username").append(user.data);
      // $("#noiDung").append(user.data + " has online");
      //send msg to server
      $("#buttonSend").click(() => {
        let msg = $("#boxChat").val();
        socket.emit("sendMSG", { msg, username });
        document.getElementById("boxChat").value = "";
      });
      //server send msg
      socket.on("serverSendMSG", (msg) => {
        console.log(msg);
        $("#noiDung").append(msg.username + ": " + msg.msg + "<br>");
      });
      //Load msg:
      fetch("http://localhost:3000/load_msg_room", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((data) => {
          // console.log("Tin nhan truoc do ");
          let msg = data.data.chat;
          let date = data.data.date;
          let username = data.data.username;
          let index = data.data.username.length;
          console.log("index: " + index);
          for (let i = index - 1; i >= 0; i--) {
            console.log(i);
            $("#noiDung").append(username[i] + ": " + msg[i] + "<br>");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      ///client send hinh anh
      // document
      //   .getElementById("uploadForm")
      //   .addEventListener("submit", function (event) {
      //     // event.preventDefault();
      //     socket.on("sendIMG", () => {});
      //     console.log("testtt.t");
      //   });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
