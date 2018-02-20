const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

var msgs = [];
var users = [];

app.use(express.static(path.join(__dirname, 'app')));

io.on('connection', function(socket) {
  console.log('User Connected');
  users.push('User ' + users.length);
  msgs.push('A User has joined, total users: ' + users.length);
  io.emit('chat message', msgs);
  io.emit('user added', users);

  socket.on('disconnect', function() {
    console.log('User Disconnected');
    users.pop();
    msgs.push('A User has Disconnected, total users: ' + users.length);
    io.emit('chat messages', msgs);
    io.emit('user removed', users);
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    msgs.push(msg);
    io.emit('chat message', msgs);
  })
});

http.listen(3000, function() {
  console.log('App is running on port ::: 3000');
});
