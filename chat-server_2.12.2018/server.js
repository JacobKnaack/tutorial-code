const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

var msgs = []

app.use(express.static(path.join(__dirname, 'app')));

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.emit('chat message', 'a user has connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msgs);
  });
});

http.listen(3000, function() {
  console.log('App running on port : 3000');
});
