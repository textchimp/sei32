
const express = require('express');
const app = express();

// Serve static files directly from the public/ folder
app.use( express.static('public') );

const server = app.listen(3000, ()=> {
  console.log('Listening for HTTP connections on port 3000...');
});

// Load the websockets library, and tell it which server to use for websocket connections
const io = require('socket.io')( server );

io.on('connection', socket => {

  console.log('someone connected on the frontend!');

  // Send a new message to the frontend, of
  // type 'news' (an ID)

  setInterval( () => {
    socket.emit('news', {
      message: 'Here is a new message'
    });
  }, 2000);

  // Listen for a 'news-response' type message
  // from the client (frontend)
  socket.on('news-response', data => {
    console.log('got a "news-response" message:', data);
  })


});
