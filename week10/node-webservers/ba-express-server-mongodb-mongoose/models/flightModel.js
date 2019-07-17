const mongoose = require('mongoose');

const { Schema } = mongoose; // destructuring: 'const Schema = mongoose.Schema;'

const FlightSchema = new Schema({
  flight_number: {
    type: String,
    required: 'Flight Number cannot be empty'
  },
  origin: {
    type: String,
    required: 'Origin cannot be blank'
  },
  destination: {
    type: String,
    required: 'Destination cannot be blank'
  },
  departure_date_formatted: {
    type: Date,
    required: 'Departure Date cannot be blank'
  }
}, { collection: 'flights'} );

module.exports = mongoose.model('Flight', FlightSchema);
