// Your top choices
//
// Create an array to hold your top choices (colors, presidents, whatever).
// For each choice, log to the screen a string like: "My #1 choice is blue."
// Bonus: Change it to log "My 1st choice, "My 2nd choice", "My 3rd choice", picking the right suffix for the number based on what it is.

const topDogs = [
  'Novia Scotia Duck-Tolling Retriever',
  'Leonberger',
  'Husky',
  'Golden Retriever',
  'Chilean Terrier'
];

const suffixes = [ 'st', 'nd', 'rd', 'th', 'th' ];

for( let i = 0; i < topDogs.length; i++ ){
  //
  // let suffix = '';
  // if( i == 0 ){
  //   suffix = 'st';
  // } else if( i == 1 ){
  //   suffix = 'nd';
  // }

  console.log(`My ${i + 1}${suffixes[i]} choice of dog is: ${topDogs[i]}`);

}
