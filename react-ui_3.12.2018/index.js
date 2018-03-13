const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client')));

http.listen(PORT, () => {
  console.log("React chat is up and running on PORT ::: " + PORT);
});
