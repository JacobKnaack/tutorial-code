var socket = io();

function emitMessage() {
  socket.emit('chat message', document.getElementById('message-input').value);
  document.getElementById('message-form').reset();
}

function displayMessages(msgs) {
  document.getElementById('msgs').innerHTML = msgs;
}

window.addEventListener('DOMContentLoaded', function() {
  socket.on('chat message', function(msgs) {
    var messageEl = ''
    for (var msg in msgs) {
      messageEl += "<li class='text'>"+msgs[msg]+"</li>";
    }
    displayMessages(messageEl);
  });

  socket.on('user added', function(users) {
    var userEl = "";
    for (var user in users) {
      userEl += "<li class=''userListItem>"+users[user]+"</li>"
    }
    document.getElementById('conversation-data').innerHTML = userEl;
  })

  document.querySelector('#message-form').addEventListener('submit', function(event){
    event.preventDefault();
    emitMessage();
  }, false);
})
