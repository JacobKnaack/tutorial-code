const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

var msgs = [];
var users = [];

app.use(express.static(path.join(__dirname, 'app')));

io.on('connection', function(socket) {
  console.log('User connected');
  users.push('User ' + socket.id);
  io.emit('system notification', 'A User has joined, total users: ' + users.length);
  io.emit('user added', users, "User " + socket.id);
  io.emit('chat message', msgs);

  socket.on('disconnect', function() {
    console.log('User Disconnected');
    users.pop();
    io.emit('system notification', 'A User has Disconnected, total users: ' + users.length);
    io.emit('user removed', users);
  });

  socket.on('chat message', function(msg, user){
    msgs.push({
      sender: user,
      message: msg
    });
    io.emit('chat message', msgs);
  })
})

http.listen(3000, function() {
  console.log('Chat App is running on PORT: 3000');
});
