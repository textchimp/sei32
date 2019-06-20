
const bros = [ 'Groucho', 'Chico', 'Harpo' ];

const printArg = function( arg, ind ){
  // console.log(arguments);
  console.log( ind, arg );
};

_.each( bros, printArg ); // pass a named function as second arg to _.each

_.each( bros, function( elem ) {   // pass an anonymous function as second arg to _.each
  console.log( elem );
});

// Closer to Ruby syntax:  bros.each do |elem| ....
_(bros).each( function( elem, index ){
  console.log( index, elem );
});

// Vanilla ES6
console.log('ES6 forEach:');
bros.forEach(function( elem ){
  console.log(elem);
});

// ES6 arrow functions:
bros.forEach( elem => console.log(elem) );

bros.forEach( (elem, index) => {
  const newOutput = elem + ' brother!';
  console.log( index, newOutput );
});
///////////////// ES6

// Each over objects:

const groucho = {
  name: 'Groucho',
  instrument: 'Guitar',
  vice: 'Cigars'
};

_(groucho).each( function( val, key ){
  console.log( key, val );
});

_(groucho).each( (val, key) => console.log(key, val) );

console.log(' map -------------------------- ');

const nums = [1, 2, 3, 4, 5];

// const squared = _(nums).map( function( elem ){
//   return elem * elem;
// });

const squared = _(nums).map( elem => elem * elem );

console.log('squared:', squared);

const longerSquared = [];
for( let i = 0; i < nums.length; i++ ){
  const elem = nums[i];
  const result = elem * elem;
  longerSquared.push( result );
}
console.log( 'longerSquared:', longerSquared );

// const brosCapitalised = _(bros).map( bro => bro + ' brother!' );
const brosCapitalised = bros.map( bro => bro + ' brother!' );
console.log( 'Marx Capital:', brosCapitalised );

console.log('reduce ------------------');

// nums = [1, 2, 3, 4, 5];
const sum = _(nums).reduce( function( total, elem ){
  // console.log(`total: ${total}, elem: ${elem}, return: ${ total + elem }`);
  return total + elem;
});

const shortSum = _(nums).reduce( (total, elem) => total + elem );
console.log('sum of nums (using .reduce):', sum, shortSum);

// const allBros = bros.reduce( (output, bro) => output + ' ' + bro );
const allBros = _(bros).reduce( (output, bro) => {
  // console.log(`output: '${output}', bro: '${bro}', return: '${ output + ' ' + bro }'`);
  return output + ' ' + bro;
});
console.log('all bros:', allBros,  bros.join(' ') );

// ActiveRecord-style Underscore methods
const brothers = [
  { name: 'Groucho', instrument: 'guitar', vice: 'cigars',     age: 44, nums: [1,2,3,5] },
  { name: 'Harpo',   instrument: 'harp',   vice: 'mutism',     age: 42, nums: [1,2,3] },
  { name: 'Chico',   instrument: 'guitar', vice: 'infidelity', age: 39, nums: [1,2,3,5] }
];

// Like ActiveRecord's ` Brother.find_by instrument: 'harp' `
const harpist = _(brothers).findWhere({ instrument: 'harp' });
console.log('The harpist is:', harpist);

// ES6: .find  - you must give a callback function as the argument,
//               which returns true or false to indicate a match

const es6Harpist = brothers.find( bro => bro.instrument === 'harp' );
console.log('es6 harpist:', es6Harpist);


// Like ActiveRecord's Brother.where instrument: 'guitar'
const allGuitarists = _(brothers).where({ instrument: 'guitar' }); //, vice: 'cigars' });
console.log('all guitarists: ', allGuitarists);

// ES6 .filter
const es6Guitarists = brothers.filter( bro => bro.instrument === 'guitar' );
console.log('es6 guitarists:', es6Guitarists);

// 'Which brothers have 5 as one of their favourite numbers?'
const faveFive = brothers.filter( bro => bro.nums.includes(5) );
console.log('five lover:', faveFive);
