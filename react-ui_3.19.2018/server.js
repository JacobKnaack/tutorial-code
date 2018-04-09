const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
// const pythonShell = require('python-shell');

app.use(express.static(path.join(__dirname, 'client')));

http.listen(PORT, () => {
  console.log('REACT BOT up and running on port ::: ' + PORT);
});
