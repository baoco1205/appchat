let token = localStorage.getItem("token");
console.log(token);
fetch("http://localhost:3000/get_username", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: {},
})
  .then((data) => {
    console.log(data);
    $("#username").append(data);
  })
  .catch((err) => {});
