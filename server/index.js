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
let playerWindowContent = []

/*    INITIALIZING SOCKET    */

let connections = 0;

io.on('connection', (socket) => {

  /*  BASIC CONNECTIONS */
  connections++;
  console.log(`A user connected (${connections + (connections === 1 ? ' connection' : ' connections')})`);

  socket.on('disconnect', () => {
    connections--;
    console.log(`A user disconnected (${connections + (connections === 1 ? ' connection' : ' connections')})`);
  });

  /*  INITIALIZING SERVER  */
  socket.on('setUp', (data) => {
    //Resetting obj in case the user returns to the start page make an adjustment
    playerWindowContent = [];

    //Updating index.js variables
    players = data;
    history = data.map(() => []);
    history.push([]); // adding one more array for the "allHistory" array

    playerWindowContent = data.map((player) => {return {
      message: player,
      background: '',
      filter: ''
    }});

    io.emit('setUpPlayerWindow', data); //Send to display the inital player name

  });

  /*  SENDING CONTENT TO PLAYERS  */

  socket.on('sendContent', (data, fn) => {
    console.log(data);
    let parsedData = JSON.parse(data);      
      
    //Update history and playerWindowContent for each player
    parsedData.playerNumbers.forEach((playerNum) => {
      history[playerNum].push(parsedData);

      Object.keys(parsedData.content).forEach((contentType) => {
        playerWindowContent[playerNum] = {...playerWindowContent[playerNum], [contentType]: parsedData.content[contentType]}
      })
    });
    
    //Push to allHistory array at the end
    history[history.length -1].push(parsedData);

    io.emit('sendContent', playerWindowContent);
    io.emit('sendHistory', history);

    fn('ack');

  }); 

});
