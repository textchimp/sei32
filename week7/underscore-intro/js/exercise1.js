var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

var people = [
  { id: 1, username: "A", active: true,  age: 20 },
  { id: 2, username: "B", active: false, age: 35 },
  { id: 3, username: "C", active: false, age: 50 },
  { id: 4, username: "D", active: true,  age: 65 },
  { id: 5, username: "E", active: true,  age: 80 },
  { id: 6, username: "E", active: true,  age: 95 },
];

// Iterate through numbers and log each number to the console
_(numbers).each( num => console.log(num) );

// Iterate through numbers and multiply each one of them by 5
// const out = [];
const out = _(numbers).map( num => num * 5 );
console.log(out);

// Iterate through numbers and reduce it by adding them together
const grandTotal = numbers.reduce( (total, num) => total + num );
console.log('grand total:', grandTotal);

// Get an array of all of the people in people that have the username "E"
const allEs = _(people).where({username: 'E'});
console.log('All Es:', allEs);

const es6Es = people.filter( item => item.username === 'E' );
console.log('es6 Es:', es6Es);

// Find the first object in people that has the id of 3
const first3 = _(people).findWhere({ id: 3 });
console.log('first 3:', first3);

// Find the first person who has an age of less than 50
const youngerThan50 = _(people).findWhere( person => person.age < 50 );
console.log('younger than 50:', youngerThan50);

// Get an array of all of the people with an age of over 60
const olderThan60 = people.filter( person => person.age > 60 );
console.log('older than 60:', olderThan60);

// Remove all of the people with an age less than 40
// const over40s = _(people).where( person => person.age >= 40 );
const over40s = people.filter( person => person.age >= 40 );
console.log('over 40', over40s);
