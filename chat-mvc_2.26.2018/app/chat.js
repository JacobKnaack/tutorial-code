var socket = io();
var clientUser = '';

function userCheck(user) {
  if (clientUser.length <= 0) {
    clientUser = user
  };
};

function emitMessage() {
  socket.emit('chat message', document.getElementById('message-input').value, clientUser);
  document.getElementById('message-form').reset();
}

function displayMessages(msgs) {
  var messageEls = ''
  for (var msg in msgs) {
    messageEls += "<li class='text'>"+msgs[msg].sender + ": " +msgs[msg].message+"</li>";
  }
  document.getElementById('msgs').innerHTML = messageEls;
};

function userConnection(userList) {
  var userEl = "";
  for (var user in userList) {
    userEl += "<li class=''userListItem>"+userList[user]+"</li>"
  }
  document.getElementById('conversation-data').innerHTML = userEl;
};

function displayNotification(note) {
  let alertEl = "<li class='notification'>" +note+ "</li>"
  document.getElementById('notifications').innerHTML = alertEl
}

window.addEventListener('DOMContentLoaded', function() {
  socket.on('chat message', function(msgs) {
    displayMessages(msgs);
  });

  socket.on('user added', function(users, user) {
    userCheck(user);
    userConnection(users);
  });

  socket.on('user removed', function(users) {
    userConnection(users);
  })

  socket.on('system notification', function(alert) {
    displayNotification(alert);
  });

  document.querySelector('#message-form').addEventListener('submit', function(event){
    event.preventDefault();
    emitMessage();
  }, false);
});
