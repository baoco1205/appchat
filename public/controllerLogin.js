$(document).ready(() => {
  $("#loginButton").click(() => {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer + ${token}`,
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
        ///////
        let getToken = localStorage.getItem(token);
        console.log(getToken);

        fetch("http://localhost:3000/homepage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer + ${getToken}`,
          },
          body: JSON.stringify({}),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
        ///////
        location.href = "http://localhost:3000/homepage";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  /////
  /////
});
