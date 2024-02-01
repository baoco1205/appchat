var socket = io("http://localhost:3000/");
let token = localStorage.getItem("token");

$(document).ready(() => {
  /////chay khi star//////
  socket.emit("loadRoomList", {});
  socket.on("error", (error) => {
    console.log(error);
    alert(error);
  });
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
      // console.log(data);
      return data.json();
    })
    .then((user) => {
      // console.log(user);
      let username = user.data.username;
      $("#username").append(username);
      let userID = user.data.id;
      ///// HIEN THONG BAO LUC DANG NHAP
      socket.emit("loadNotification", { username });
      socket.on("serverResponseNotification", (data) => {
        let notificationInfor = data.data;
        if (notificationInfor.length == 0) {
          console.log("no add or something ");
        } else {
          console.log(notificationInfor);
          $("#notification").empty();
          for (let i = 0; i < notificationInfor.length; i++) {
            let userAddMe = notificationInfor[i].whoAddMe;
            let userAcceptMe = notificationInfor[i].whoAcceptMe;
            // console.log("///////////////");
            // console.log(userAcceptMe);
            let listNotification = $(
              `<div>User have name ${userAddMe} want add friend with you</div>`
            );
            listNotification.click(() => {
              handleNotification(userAddMe);
            });

            $("#notification").append(listNotification);
          }
          // socket.on;
        }
      });
      function handleNotification(userAddMe) {
        if (userAddMe == username) {
          let msg = "You can't add yourself";
          socket.emit("error", msg);
        } else {
          let result = confirm(`You want accept friend with ${userAddMe}`);
          if (result) {
            socket.emit("handleAddFriend", {
              userAddMe: userAddMe,
            });
            alert(`Now you and ${userAddMe} is a friend`);
            location.href = "http://127.0.0.1:5501/views/indextemp.html";
          } else {
            console.log("Do not thing");
          }
        }
      }
      //gui username
      socket.emit("clientSendInfor", { username: username, userID: userID });
      /////load all user
      socket.emit("loadAllUser", {});
      socket.on("serverSendAllUser", (listAllUser) => {
        console.log(listAllUser); // tra ve username va userID
        let arrayUsername = listAllUser.username;
        let arrayID = listAllUser.id;
        let length = arrayUsername.length;
        $("#allUserList").empty();
        ////socket.on khong duoc de trong for.
        //se lam ham on goi nhieu lan sinh ra loi
        let userTemp = [];
        let idTemp = [];
        for (let i = 0; i < length; i++) {
          let user = arrayUsername[i];
          let userNeedAddID = arrayID[i];
          userTemp.push(user);
          idTemp.push(userNeedAddID);
          let listItem = $(`<li id="${userNeedAddID}">${user}</li>`);
          listItem.click(() => {
            if (user == username) {
              let msg = "Your can't add yourself";
              alert(msg);
            } else {
              socket.emit("checkFriendAlready", {
                userNeedAddID: userNeedAddID,
                usernameNeedAdd: user,
                indexUser: i,
              });
            }
          });
          $("#allUserList").append(listItem);
        }
        socket.on("serverResponseFriendAlready", (data) => {
          let indexUser = data.indexUser; // tra ve vi tri cua mang
          let checkFriend = data.check; // tra ve true false
          let user = userTemp[indexUser];
          let userNeedAddID = idTemp[indexUser];
          console.log(data);
          if (checkFriend) {
            console.log(user);
            console.log(userNeedAddID);
            socket.emit("sendAddFriend", {
              username: user,
              userNeedAddID: userNeedAddID,
            });
          } else {
            let msg = "You and " + user + " already friend before";
            console.log(msg);
            socket.emit("error", msg);
          }
        });
        socket.on("loadAtUserOnline", (data) => {
          let userNeedAdd = data.userNeedAdd;
          console.log(userNeedAdd);
          socket.emit("loadNotification", { userNeedAdd });
        });
        socket.on("addSuccess", (data) => {
          //username là người cần add.
          alert(`Invite friend to ${data.username} success`);
        });
      });
      ////load all friend
      socket.emit("loadFriend");

      socket.on("serverResponseListFriend", (listFriend) => {
        let arrayFriend = listFriend.listFriend;
        let arrayFriendID = listFriend.listUserID;
        let length = arrayFriend.length;

        $("#friendList").empty();
        for (let i = 0; i < length; i++) {
          let friend = arrayFriend[i];
          let friendID = arrayFriendID[i];
          let listFriend = $(`<li">${i + 1 + ". "}${friend}</li></br>`);
          listFriend.click(() => {
            handleUserSelectionToDelete(friend, friendID);
          });
          $("#friendList").append(listFriend);
        }
        function handleUserSelectionToDelete(friend, friendID) {
          let result = confirm(`You want unfriend with ${friend}`);
          if (result) {
            socket.emit("unfriend", { friendID: friendID, friend: friend });
            alert("delete success");
          } else {
          }
        }
      });

      socket.on("serverConfirmUnfriend", () => {
        location.href = "http://127.0.0.1:5501/views/indextemp.html";
      });

      /////notification user online
      socket.emit("notificationUserOnl", { username, token });
      socket.on("serverNotificationUserOnl", (listUserOnline) => {
        console.log("tesstststst");
        console.log(listUserOnline);
        let length = listUserOnline.usernameOnl.length;
        $("#userList").empty();
        for (let i = 0; i < length; i++) {
          let userOnl = listUserOnline.usernameOnl[i];
          let id = listUserOnline.userID[i];
          // Tạo thẻ li với sự kiện click được gắn liền
          let listItem = $(`<li">${i + 1 + ". "}${userOnl}</li></br>`);
          // Gắn sự kiện click cho thẻ li
          listItem.click(() => {
            console.log("Do not thing ");
          });
          // Thêm thẻ li vào #userList
          $("#userList").append(listItem);
        }

        /////notification friend  online
        fetch("http://localhost:3000/load_friend_online", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            listUserOnline: listUserOnline,
          }),
        })
          .then((response) => {
            // console.log(response);
            return response.json();
          })
          .then((data) => {
            let listFriendOnline = data.data;
            $("#friendOnl").empty();
            for (let i = 0; i < listFriendOnline.length; i++) {
              let friend = listFriendOnline[i];
              // let friendID = arrayFriendID[i];
              let friendOnline = $(`<li>${friend}</li>`);
              friendOnline.click(() => {
                handleUserSelectionToChat(friend);
              });
              $("#friendOnl").append(friendOnline);
            }
          })
          .catch((err) =>
            console.error("There was a problem with the fetch operation:", err)
          );
      });
      function handleUserSelectionToChat(friend) {
        alert("TESSTTST");
      }
      /////load friend online
      socket.emit("notificationFriendOnl", {});
      socket.on("serverNotificationFriendOnl", { token });

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
        socket.emit("sendMSGRoom", { msg, username });
        document.getElementById("boxChat").value = "";
      });
      //server send msg
      socket.on("serverSendMSGRoom", (msg) => {
        console.log(msg);
        var noiDung = document.getElementById("noiDung");
        // document.getElementById("noiDung").value = "";
        // document.getElementById("noiDung").innerText = "";
        $("#noiDung").append(msg.username + ": " + msg.historyChat + "<br>");
        noiDung.scrollTop = noiDung.scrollHeight;
      });

      ////////////////////////////ROOM////////////////////////
      ///Tao room
      $("#createRoomButton").click(() => {
        let roomName = $("#roomName").val();
        socket.emit("createRoom", roomName);
        document.getElementById("roomName").value = "";
      });
      //server tra ve roomlist
      socket.on("serverSendRoomList", (data) => {
        ///data co mang roomlist
        $("#roomAlready").empty();
        let roomList = data.roomList;
        console.log(data);
        for (let i = 0; i < roomList.length; i++) {
          let nameRoom = roomList[i];
          let listItem = $(`<li>${roomList[i]}</li><br>`);
          listItem.click(() => {
            let roomNow = $("#roomJoing").text();
            // console.log(roomNow);
            $("#roomJoing").empty();
            $("#roomJoing").append("You in room: " + roomList[i]);
            socket.emit("joinRoom", { nameRoom, roomNow });
            ///load tin nhan trong room
            //Load msg:
            fetch("http://localhost:3000/load_msg_room", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ nameRoom: nameRoom }),
            })
              .then((response) => {
                // console.log(response);
                return response.json();
              })
              .then((data) => {
                var noiDung = document.getElementById("noiDung");

                // console.log("Tin nhan truoc do ");
                let msg = data.data.chat;
                let username = data.data.username;
                let index = data.data.username.length;
                $("#noiDung").empty();
                // console.log("index: " + index);
                for (let i = index - 1; i >= 0; i--) {
                  $("#noiDung").append(username[i] + ": " + msg[i] + "<br>");
                }
                noiDung.scrollTop = noiDung.scrollHeight;
              })
              .catch((err) => {
                console.log(err);
              });
            ///
          });
          $("#roomAlready").append(listItem);
        }
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
