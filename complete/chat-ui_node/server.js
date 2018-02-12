const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
//initialize the socket.io instance and pass in the http server object
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@ds229918.mlab.com:29918/purple-chat'
const mockData = require('./client/src/db.json');

var Conversations = mongoose.model('Conversation', {
  name: String,
  chat: String
});

mongoose.connect(mongoUri, (err) => {
  console.log('Database Connection ::: Error:', err);
});

//serving client src code
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetching mock data
app.get('/mockUsers', (req, res) => {
  try {
    res.set('Content-Type', 'application/json');
    res.send(mockData.users);
  } catch (error) {
    res.sendStatus(500)
    res.send(error);
    console.error('Server Error: ', error);
  }
});

//fetching messages from messages data
app.get('/mockMessages/to:recipient_id/from:creator_id', (req, res) => {
  try {
    const conversationMessages = []
    for (let message in mockData.messages) {
      if (parseInt(req.params.recipient_id) === mockData.messages[message].recipient_id || parseInt(req.params.creator_id) === mockData.messages[message].creator_id) {
        conversationMessages.push(mockData.messages[message])
      }
    }
    res.set('Content-Type', 'application/json');
    res.send(conversationMessages);
  } catch (error) {
    res.set('status', 500);
    res.send(error);
    console.error('Server Error: ', error )
  }
});

app.post('/login', (req, res) => {
  try {
    var newUser = {
      id: mockData.users.length + 1,
      userName: req.body.username,
      created_at: new Date()
    }
    mockData.users.push(newUser);
    fs.writeFile('./client/src/db.json', JSON.stringify(mockData), function(err) {
      console.log('New User Added to db ::: Error: ', err);
    });
    res.send(newUser);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.delete('/logout/:id', (req, res) => {
  try {
    var removedUser = mockData.users.filter(function(el) {
      return el.id !== parseInt(req.params.id);
    })
    mockData.users = removedUser;
    fs.writeFile('./client/src/db.json', JSON.stringify(mockData), function(err) {
      console.log('User logged out and data destroyed ::: Error: ', err);
    });
    res.sendStatus(202);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//sending messages to mongoose database!!
// app.post('/chat', async (req, res) => {
//   try {
//     var chat = new Conversation(req.body);
//     await chat.save();
//     res.sendStatus(200);
//     res.send(chat);
//   } catch (error) {
//     res.sendStatus(500);
//     console.error(error);
//   }
// });

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
  console.log(`Purple Chat Running on PORT:::${PORT}`);
});