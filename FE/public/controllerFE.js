$(document).ready(() => {
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
        location.href = "http://127.0.0.1:5501/views/login.html";
        // axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        // localStorage.setItem("bearerToken", reponse.token);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  //login

  $("#linkRegister").click(() => {
    location.href = "http://127.0.0.1:5501/views/register.html";
    // window.location.href = "http://127.0.0.1:5501/views/register.html";
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
