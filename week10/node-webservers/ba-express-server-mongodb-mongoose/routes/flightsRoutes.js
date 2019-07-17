// All the flight routes and their handlers are defined here

const controller = require('../controllers/flightsController');

module.exports = (app) => {

  app.route('/flights')
    .get(controller.flightsIndex)
    .post(controller.flightsCreate);

  app.route('/flights/:id')
    .get(controller.flightsShow)
    .post(controller.flightsUpdate)

};
