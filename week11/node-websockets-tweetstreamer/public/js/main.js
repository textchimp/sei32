
console.log('io:', io);

// TODO: how to authenticate websocket connections?
const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  console.log('Websockets connection established!');
});

socket.on('disconnect', () => {
  console.log('lost connection to server!');
})

// Listen for 'news' type messages from the server
socket.on('news', data => {
  console.log('Got a "news" message:', data);

  // Send a 'news-response' type event to the
  // websockets server (backend)
  socket.emit('news-response', {
    status: 'got the news, thanks'
  });

})

socket.on('tweet', data => {

  console.log('got tweet:', data);
  //
  // $('#tweets').prepend(`
  //   <p>
  //     <strong>${ data.tweet.user.screen_name }</strong>:
  //     ${ data.tweet.text }
  //   </p>
  // `);

  if( 'extended_entities' in data.tweet ){
    data.tweet.extended_entities.media.forEach( item => {
      $('#tweets').prepend(`<img src="${ item.media_url }">`)
    });
  }

});
