let token = localStorage.getItem("token");
console.log("token: " + token);
setTimeout(() => {
  fetch("http://localhost:3000/homepage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer + ${token}`,
    },
    body: JSON.stringify({
      token: token,
    }),
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
      console.error("There was a problem with the fetch operation:", error);
    });
}, 1000);
