const express = require('express');
const app = express();
const fs = require('fs');
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static('../resources'));

app.get('/res/', async (req, res, next) => {
  let contentTypesArr = req.query.contentTypes.split(',');
  let contentObj = {};

  contentTypesArr.forEach(contentType => {
    let fileArray = [];
    let response = fs.readdirSync(`../resources/${contentType}`);
    
    response.forEach(file => {
      fileArray.push(file);
    })

    contentObj[contentType] = fileArray;
  });

  res.json(contentObj);
})
