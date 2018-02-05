const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

//initialize the socket.io instance and pass in the http server object
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client')));

//listen for a connection
io.on('connection', function(socket){
  console.log('a user connected');
  //listen for a disconnection
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ', msg);
    // be sure to emit messages here
    socket.emit('chat message', msg);
  });
});

http.listen(PORT, function(){
  console.log(`listening on :::${PORT}`);
});