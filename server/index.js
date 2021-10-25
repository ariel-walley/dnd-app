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

/*    CORS    */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/*    SENDING FILE RESOURCES    */

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

let history = {
  allHistory: [],
  history1: [],
  history2: [],
  history3: [],
  history4: []
}

io.on('connection', (socket) => {

  /*  Basic Connections */

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  /*  Sending text messages to players  */

  socket.on('displayBasicText', (msg, fn) => {
    console.log('message: ' + msg);
    let parseMsg = JSON.parse(msg);

    history.allHistory.push({
      contentType: parseMsg.contentType,
      content: parseMsg.content,
      playerNumbers: parseMsg.playerNumbers,
      playerNames: parseMsg.playerNames,
      timestamp: new Date()
    })

    parseMsg.playerNumbers.forEach((player) => {
      history['history' + player].push({
        contentType: parseMsg.contentType,
        content: parseMsg.content,
        playerNumbers: parseMsg.playerNumbers,
        playerNames: parseMsg.playerNames,
        timestamp: new Date()
      })
    });

    console.log(history.allHistory);
    history.allHistory.forEach((hist) => {
      console.log(hist.playerNames);
    })
    io.emit('displayBasicText', msg);
    io.emit('displayHistory', history);
    fn('ack');

  }); 

});
