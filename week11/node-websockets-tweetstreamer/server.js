
const express = require('express');
const app = express();

const tweetStream = require('./tweetstream');
// console.log('tweetStream:', tweetStream);

// Serve static files directly from the public/ folder
app.use( express.static('public') );

const server = app.listen(3000, ()=> {
  console.log('Listening for HTTP connections on port 3000...');
});

// Load the websockets library, and tell it which server to use for websocket connections
const io = require('socket.io')( server );

io.on('connection', socket => {

  console.log('someone connected on the frontend!');

  tweetStream.on('data', tweet => {
    console.log('Got a new tweet: ', tweet.text);
    socket.emit('tweet', {
      // text: tweet.text,
      // media: tweet.extended_media,
      tweet
    });
  });


  // setInterval( () => {
  //   // Send a new message to the frontend, of
  //   // type 'news' (a made-up ID)
  //   socket.emit('news', {
  //     message: 'Here is a new message'
  //   });
  // }, 2000);

  // Listen for a 'news-response' type message
  // from the client (frontend)
  socket.on('news-response', data => {
    console.log('got a "news-response" message:', data);
  })

  socket.on('disconnect', socket => {
    console.log('a client has disconnected');
  });


});  // io.on('connect', ...)


// Send a one-off message to every connected client
// (because the emit is called on the global `io` object,
// not on a particular socket connection)
io.emit('broadcast-alert', {message: 'You all need to know this...'});
