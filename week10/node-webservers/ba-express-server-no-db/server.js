// fake DB
const flights = [
  {
    id: 1,
    flight_number: '123',
    departure_date_formatted: 'Tue 25 December, 08:00am',
    origin: 'SYD',
    destination: 'SFO',
    plane: { name: '737', rows: 40, cols: 4 }
  },
  {
    id: 2,
    flight_number: '456',
    departure_date_formatted: 'Wed 26 December, 02:00pm',
    origin: 'SYD',
    destination: 'SFO',
    plane: { name: '747', rows: 60, cols: 6 }
  },
  {
    id: 3,
    flight_number: '789',
    departure_date_formatted: 'Tue 30 December, 09:00am',
    origin: 'SYD',
    destination: 'SIN',
    plane: { name: '757', rows: 80, cols: 8 }
  },
];

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const server = app.listen(3333, () => {
  console.log('Listening on port 3333...');
});

// Listen for GET requests to the root route '/'

// get '/' do
//   'Hello World'
// end

app.get('/', (req, res) => {
  // console.log(req.query);
  // res.send(`<h1>Hello ${ req.query.dogs || 'World' } from Express.js!!!</h1>`);
  res.render('index', {
    name: req.query.name,
    greeting: 'woof!'
  });
});

app.get('/dogs/:name', (req, res) => {
  // res.send('<h1>YEAH DOGS!</h1>');
  // res.send( req.params.name );
  res.render('index', {
    name: req.params.name,
    greeting: 'Yo!'
  })
});

app.get('/flights', (req, res) => {
  res.render('flights_index', { flights });
});
app.get('/flights.json', (req, res) => {
  res.json(flights);
});

// Make the following routes work:
// GET '/flight/:id'
//  - to get one flight by ID
// GET '/search/:origin/:destination'
//  - to search for flights
// POST '/booking'
//  - to make a reservation

// Plug this in the Vue frontend!
//  - i.e. work out how to handle CORS in Express
//  - also work out how to handle POSTed form data
//  - you might also need to render the correct reservation
//    lookup objects (with the correct names)
