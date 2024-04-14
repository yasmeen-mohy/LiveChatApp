const express = require("express");
const http = require("http");
const socketIO = require("socket.io");


const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log('User connected');

  // Handle incoming messages
  socket.on('chat message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, function () {
  console.log("Listening on http://localhost:"+port);
});
