$(document).ready(() => {
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
        // axios.defaults.headers.common["Bearer Token"] = `Bearer ${token}`;
        //////
        fetch("http://localhost:3000/homepage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response;
          })
          .then((data) => {
            // axios.defaults.headers.common["Bearer Token"] = `Bearer ${token}`;
            location.href = "http://localhost:3000/homepage";
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
        //////
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  /////
});
