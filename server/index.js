const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

server.listen(3100, () => {
  console.log('listening on *:3100');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('displayBasicText', (msg, fn) => {
    console.log('message: ' + msg);
    io.emit('displayBasicText', msg);
    fn('ack')
  });
});
