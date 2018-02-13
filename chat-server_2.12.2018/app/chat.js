var socket = io();

function emitMessage() {
  socket.emit('chat message', document.getElementById('chatInput').value);
  document.getElementById('sendMessage').reset();
}

window.addEventListener('DOMContentLoaded', function() {
  socket.on('chat message', function(msg) {
    console.log('chat message returned', msg);
  });

  document.querySelector('#sendMessage').addEventListener('submit', function(event) {
    event.preventDefault();
    emitMessage();
  }, false)
})
