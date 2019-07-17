
const mongoose = require('mongoose');
const Flight = mongoose.model('Flight');

module.exports = {

  flightsIndex(req, res){
    Flight.find({}, (err, flights) => {
      if( err ){
        res.json( err );
      } else {
        res.json({ flights });
      }
    }); // Like AR Flight.all
  },

  flightsShow(req, res){
    // res.json({ status: 'successful GET /flights/' + req.params.id });
    Flight.findOne(
      { flight_number: req.params.id },
      (err, flight) => {
        if( err ){
          res.json( err );
        } else {
          res.json({ flight });
        }
      }); // Like AR Flight.all
  },

  flightsCreate(req, res){
    res.json({ status: 'successful POST /flights' });
  },

  flightsUpdate(req, res){
    res.json({ status: 'successful POST to /flights/' + req.params.id});
  }

};
