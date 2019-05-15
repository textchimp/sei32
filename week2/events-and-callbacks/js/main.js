
console.log('loaded?');

const hello = function(){
  console.log('Hello!');
};

const goodbye = function(){
  console.log('Goodbye!');
};


const runNicely = function( functionToRunNicely ){
  console.log('Hello, I am about to run your function, I hope that is to your liking, sir!');

  functionToRunNicely();

  console.log('I sincerely hope that went well for you! Thank you for letting me help you to run your function, and have a wonderful day!');
};

// runNicely( hello );
//
// runNicely( goodbye );
//
// runNicely( function(){
//   console.log('Hello from inside an anonymous function!');
//   console.log('Another line...');
// });

const bill = document.getElementById('bill');

bill.style.position = 'absolute';
bill.style.left = 0;

bill.addEventListener('click', function( event ){
  console.log('clicked!');
  console.log( event );
});



window.setInterval(function(){
  // We need to get the current left offset as a number,
  // so we have to get rid of the 'px'; i.e. parseInt('100px')
  // will return just the integer 100
  const left = parseInt(bill.style.left);

  // Increment the offset and save it back
  bill.style.left = (left + 10) + 'px';

}, 100);  // .....every 100ms
