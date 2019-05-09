// WHY DO WE NEED OBJECTS?
//
const student = [
  'Luke',  // Name
  70,      // Age
  '10-03-2019', // Date Enrolled
  false    // Fees Paid?
];
//
// console.log( student[1] );   // log out age
//
//
// const studentObject = {
//   name: 'Luke',
//   age: 70,
//   enrollmentDate: '10-03-2019',
//   hasPaidFees: false
// };
//
// console.log( studentObject.age );  // self-explanatory



///////////////////// EXERCISES /////////////////////////////

// The Reading List
// Keep track of which books you read and which books you want to read!
//
// Create an array of objects, where each object describes a book and has properties for the title (a string), author (a string), and alreadyRead (a boolean indicating if you read it yet).
// Iterate through the array of books. For each book, log the book title and book author like so: "The Hobbit by J.R.R. Tolkien".
// Now use an if/else statement to change the output depending on whether you read it yet or not. If you read it, log a string like 'You already read "The Hobbit" by J.R.R. Tolkien', and if not, log a string like 'You still need to read "The Lord of the Rings" by J.R.R. Tolkien.'

const readingList = [
  {
    title: 'Lincoln in the Bardo',
    author: 'George Saunders',
    alreadyRead: true
  },
  {
    title: 'It',
    author: 'Stephen King',
    alreadyRead: true
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
    alreadyRead: false
  },
];

for( let i = 0; i < readingList.length; i++ ){
  const book = readingList[i];
  if( book.alreadyRead ){
    console.log(`You have already read "${book.title}" by ${book.author}`);
  } else {
    console.log(`You still need to read "${book.title}" by ${book.author}`);
  }
}


// The Recipe Card
// Never forget another recipe!
//
// Create an object to hold information on your favorite recipe. It should have properties for title (a string), servings (a number), and ingredients (an array of strings).
//
// On separate lines (one console.log statement for each), log the recipe information so it looks like:
//
// Mole
// Serves: 2
// Ingredients:
// cinnamon
// cumin
// cocoa

const recipe = {
  title: 'Butterscotch',
  servings: 1,
  ingredients: ['butter', 'scotch']
};

console.log( recipe.title );
console.log(`Serves: ${ recipe.servings }`);
console.log('Ingredients:');
console.log( recipe.ingredients.join("\n") );
// for( let i = 0; i < recipe.ingredients.length; i++ ){
//   console.log( recipe.ingredients[i] );
// }

// The Movie Database
// It's like IMDB, but much much smaller!
//
// Create an object to store the following information about your favorite movie: title (a string), duration (a number), and stars (an array of strings).
// Create a function to print out the movie information like so: "Puff the Magic Dragon lasts for 30 minutes. Stars: Puff, Jackie, Living Sneezes."
// Maybe the join method will be helpful here

const favouriteMovie = {
  title: 'Inherent Vice',
  duration: 150,
  stars: ['Joaquim Phoenix', 'Josh Brolin', 'Reese Witherspoon'],
  printInfo: function(){
    console.log(`${ this.title } lasts for ${ this.duration } minutes. Stars: ${ this.stars.join(', ') }`);
  }
};

const printMovieInfo = function( movie ){
  console.log(`${ movie.title } lasts for ${ movie.duration } minutes. Stars: ${ movie.stars.join(', ') }`);
};
