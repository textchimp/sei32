
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
  db = client.db('ba'); // success!
});

const PORT = process.argv[2] || 3333;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
  res.json({ status: 'all good!'});
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
    result.reservations.forEach( r => reservations[`${r.row}:${r.col}`] = 1 );

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
