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

/*    INITIALIZING SOCKET    */

io.on('connection', (socket) => {

  /*  BASIC CONNECTIONS */

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  /*  INITIALIZING SERVER  */
  socket.on('setUp', (data, fn) => {
    //Resetting obj in case the user returns to the start page make an adjustment
    playerWindowContent = [];

    //Updating index.js variables
    players = data;
    history = data.map(() => []);
    history.push([]); // adding one more array for the "allHistory" array

    playerWindowContent = data.map((player) => {return {
      message: player,
      background: null,
      filter: null
    }});

    console.log(playerWindowContent);
    io.emit('snapshots', playerWindowContent); //Send so snapshots.js has the inital playerWindow display

    io.emit('playerWindow2', data); //Send to display the inital player name

    fn('ack');
  });

  /*  SENDING CONTENT TO PLAYERS  */

  socket.on('displayBasicText', (data, fn) => {
    console.log(data);
    let parsedData = JSON.parse(data);

    if (!Object.keys(parsedData.content).includes('init')) {
      // ^^^ Get rid of init message somehow
      
      //Push to player's history
      parsedData.playerNumbers.forEach((player) => {
        history[player].push(parsedData);
      });
      
      //Push to allHistory array at the end
      history[history.length -1].push(parsedData);

      io.emit('displayHistory', history);
    }
    
    io.emit('displayBasicText', data);
    
    fn('ack');

  }); 

});
