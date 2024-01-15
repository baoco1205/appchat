// var socket = io("http://localhost:3000/");
let token = localStorage.getItem("token");
$(document).ready(() => {
  ////Check login first
  fetch("http://localhost:3000/get_username", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    if (!data.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("test");
    location.href = "http://127.0.0.1:5501/views/indextemp.html";
  });

  $("#loginButton").click(() => {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            alert("WRONG PASSWORD OR USERNAME");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.token);
        let token = data.token;
        localStorage.setItem("token", token);
        location.href = "http://127.0.0.1:5501/views/indextemp.html";
        // axios.defaults.headers.common["Bearer Token"] = `Bearer ${token}`;
        // authorization: `Bearer ${token}`,
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  /////checkLogin
});
