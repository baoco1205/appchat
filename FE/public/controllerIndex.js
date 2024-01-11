var socket = io("http://localhost:3000/");
let token = localStorage.getItem("token");
$(document).ready(() => {
  console.log(token);
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
      $("#username").append(user.data);
      //send msg
      $("#buttonSend").click(() => {
        let msg = $("#boxChat").val();
        socket.emit("sendMSG", { msg, username });
        document.getElementById("boxChat").value = "";
      });
      //gui tin nhan
      socket.on("serverSendMSG", (msg) => {
        console.log(msg);
        $("#noiDung").append(msg.username + ": " + msg.msg + "<br>");
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
