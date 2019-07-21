
const express = require('express');
const app = express();

const cors = require('cors');
app.use( cors() ); // use the cors package as a middleware layer, i.e. add CORS allow header
app.use(express.json()); // to support JSON-encoded bodies (for formdata)
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies (for formdata)

const MongoClient = require('mongodb').MongoClient;
let db; // global var to store the db connection object

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
  if( err ) return console.log(err);  // early return on error

  // This lets us set the DB name to use from an environment variable
  // in the shell, i.e. like so:
  //     DB_NAME=ba-test npm run test
  // It makes it easy to switch databases for testing, for example
  // in the 'scripts' section of package.json:
  //    "watch": "DB_NAME=ba-test nodemon --exec jasmine"
  const dbName = process.env['DB_NAME'] || 'ba';

  console.log( 'Using database:', dbName );
  db = client.db( dbName ); // success!
});

const PORT = process.argv[2] || 3333;  // use the command line arg as port, or if not given default to 3333

/// Websockets setup:
// Fist, pass the Express app instance to the http package to create a websockets server which
// can share the same port as the webserver. See here: https://socket.io/docs/#Using-with-Express
var websocketsServer = require('http').Server( app );

// Use the websocket-wrapped server as our main HTTP server
const server = websocketsServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = server; // export the HTTP server so we can require() it for testing


// start using the websockets/HTTP server to actually make websocket connections
const io = require('socket.io')( websocketsServer );

let socketConnectionCount = 0;

io.on('connection', socket => {
  socketConnectionCount++;
  console.log('A client has connected: #', socketConnectionCount);
  console.log('Socket ID: ', socket.id);

  const timerId = setInterval( () => {
    if( socketConnectionCount > 0 ){
      console.log('pinged frontend! Socket ID:', socket.id);
      socket.emit('ping', { message: 'hello' });
    }
  }, 2000);

  socket.on('disconnect', socket => {
    socketConnectionCount--;
    // Cancel the timeout, to stop pinging this closed socket
    clearInterval( timerId );
    console.log('disconnection', socketConnectionCount);
  });

});
//////////////////////


app.get('/', (req, res) => {
  // res.json({ status: 'all good!'});
  res.send('Hello world!');
});

app.get('/flights', (req, res) => {
  db.collection('flights').find().toArray( (err, results) => {
    if( err ){
      res.json( { error: err });
    } else {
      res.json( results );
    }
  });
});

app.get('/flights/:origin/:destination', (req, res) => {
  const query = { origin: req.params.origin, destination: req.params.destination};
  db.collection('flights').find( query ).toArray( (err, results) => {
    if( err ){
      res.json( { error: err });
    } else {
      res.json( results );
    }
  });
});

app.get('/flights/:id', (req, res) => {
  const flightNumber = req.params.id;

  db.collection('flights').findOne({ flight_number: flightNumber }, (err, result) => {

    // Build a quick-lookup object of reservations from the nested reservation data for this flight
    const reservations = {};
    if( 'reservations' in result ){
      result.reservations.forEach( r => reservations[`${r.row}:${r.col}`] = 1 );
    }

    res.json({
      flight: result,
        reservations, // reservations: reservations
        user_reservations: {} // no user system for now
    });
  });

}); // flights/:id


app.post('/reservations', (req, res) => {
  console.log('POST /reservations: params:', req.body);

  db.collection('flights').updateOne(

    // find the document to update using this query:
    { flight_number: req.body.flight_id },

    // specify the new fields for the document:
    {
      $push: {           // append to the reservations array, don't overwrite it
        reservations: {
          row: req.body.row,
          col: req.body.col,
          user_id: req.body.user_id
        }
      }
    },

    // callback to run when the update is finished:
    (err, result) => {
      if( err ) return console.log( "ERROR on update:", err );

      const reservation = {
        row: req.body.row,
        col: req.body.col
      };

      // broadcast to all connected clients
      console.log('EMIT: new-reservation', reservation);
      try {
        io.emit('new-reservation', reservation);
      } catch(e) {
        console.warn('emit error', e);
      }

      // console.log('update result:', result );
      res.json({
        reservation: {
          row: req.body.row,
          col: req.body.col
        }
      });
    }

  ); // updateOne()


});
