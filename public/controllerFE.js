$(document).ready(() => {
  var socket = io("http://localhost:3000");
  ///xu ly su kien
  //gui tin nhan
  socket.on("serverSendMSG", (msg) => {
    $("#noiDung").append(msg + "<br>");
  });
  //xu ly dang ky
  socket.on("notificationRegister", (data) => {
    alert("Register success");
    window.location = "localhost:3000/login";
  });
  socket.on("errorRegister", (msg) => {
    alert(msg);
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
        alert("{Password and confirm password must match !!");
        location.reload();
      }
      socket.emit("register", username, password, nickname, name);
    });
  });

  var input = document.getElementById("boxChat");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("buttonSend").click();
    }
  });
});
