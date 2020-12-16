const port = process.env.PORT || 8000;
const INDEX = "./index.html";
const express = require("express");
const path = require("path");
const static_path = path.join(__dirname, "/public");
const server = express()
  .use(express.static(static_path))
  .listen(port, () => console.log(`Listening on ${port}`));
const io = require("socket.io")(server);
// const io = socketIO(server);
const users = {};
io.on("connection", (socket) => {
  socket.on("new_user_joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user_joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
// console.log(`listen on port ${port}`);
