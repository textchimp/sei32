
console.log('io:', io);

const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  console.log('Websockets connection established!');
});

// Listen for 'news' type messages from the server
socket.on('news', data => {
  console.log('Got a "news" message:', data);

  // Send a 'news-response' type event to the
  // websockets server (backend)
  socket.emit('news-response', {
    status: 'got the news, thanks'
  });

})
