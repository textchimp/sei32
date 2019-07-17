const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;  // ready for Heroku deploy!


// Mongoose setup
const mongoose = require('mongoose');
global.Flight = require('./models/flightModel');  // wtf?
// fix mongoose promise???
mongoose.connect(
  'mongodb://127.0.0.1:27017/ba',
  { useNewUrlParser: true }
);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const flightsRoutes = require('./routes/flightsRoutes');
flightsRoutes(app); // pass the express app into our function which assigns routes to it


app.get('/', (req, res) => {

  Flight.find({}, (err, flights) => {
    if( err ){
      res.json( err );
    } else {
      res.json({ flights });
    }
  }); // Flight.find()

});
