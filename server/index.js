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

/*    SENDING FILE RESOURCES TO CLIENT    */

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

/*  VARIABLES    */
let players = [];
let history = [];

// for now -- let's push to different histories but eventually we'll parse this out

/*    INITIALIZING SOCKET    */

io.on('connection', (socket) => {

  /*  BASIC CONNECTIONS */

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  /*  INITIALIZING SERVER  */
  socket.on('initializeServer', (data) => {
    players = JSON.parse(data).players;
    history = players.map(() => []);
    history.push([]); // adding one more array for the "allHistory" array
  });

  /*  SENDING CONTENT TO PLAYERS  */

  socket.on('displayBasicText', (content, fn) => {
    let parseContent = JSON.parse(content);

    if (!Object.keys(parseContent.content).includes('init')) {
      
      //Push to player's history
      parseContent.playerNumbers.forEach((player) => {
        history[player].push(parseContent);
      });
      
      //Push to allHistory array at the end
      history[history.length -1].push(parseContent);

      io.emit('displayHistory', history);
    }
    
    io.emit('displayBasicText', content);
    
    fn('ack');

  }); 

});
