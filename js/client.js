const socket = io("http://localhost:8000");
const user = prompt("enter your name");
const form = document.getElementById("form");
const messageText = document.getElementById("input");
const messageContainer = document.querySelector(".container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageText.value;
  append(`You : ${message}`, "messageRight");
  socket.emit("send", message);
  messageText.value = "";
});

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};
const appendUser = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("joined_user_message");
  messageContainer.append(messageElement);
};
socket.emit("new_user_joined", user);
socket.on("user_joined", (name) => {
  appendUser(`${name} joined the chat`);
});

socket.on("receive", (data) => {
  console.log(data.message);
  append(`${data.message} : ${data.name}`, "messageLeft");
});
socket.on("left", (name) => {
  appendUser(`${name} left the chat`);
});
