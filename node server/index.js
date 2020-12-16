const port = process.env.PORT || 8000;
const io = require("socket.io")(port);
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
