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

/*  HISTORY OBJECT    */

// for now -- let's push to different histories but eventually we'll parse this out

let history = {
  allHistory: [],
  history0: [],
  history1: [],
  history2: [],
  history3: []
}

io.on('connection', (socket) => {

  /*  BASIC CONNECTIONS */

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  /*  SENDING CONTENT TO PLAYERS  */

  socket.on('displayBasicText', (content, fn) => {
    console.log(content);
    let parseContent = JSON.parse(content);

    if (!Object.keys(parseContent.content).includes('init')) {
      history.allHistory.push(parseContent);

      parseContent.playerNumbers.forEach((player) => {
        history['history' + player].push(parseContent)
      });

      io.emit('displayHistory', history);
    }
    
    io.emit('displayBasicText', content);
    
    fn('ack');

  }); 

});
