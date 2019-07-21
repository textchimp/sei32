
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

const tweetStream = client.stream('statuses/filter', {
  track: process.argv[2] || 'trump', // show only tweets containing this keyword
  language: 'en'
});


// tweetStream.on('data', tweet => {
//   console.log('Got a new tweet: ', tweet.text);
//   // console.log('Got a new tweet: ', tweet.extended_tweet.full_text);
// });

// By exporting the stream object here, we can
// require() this file in our server.js file, and
// have access to the tweet stream there. If we
// use the tweetStream.on() listener in our websocket
// connection callback, we can forward on any incoming
// tweets straight to the frontend, over the websockets
// connection.
module.exports = tweetStream;
