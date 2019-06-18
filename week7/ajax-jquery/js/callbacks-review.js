
const sayHello = function(){
  console.log('Hello from inside sayHello()!');
  return 'hello!'
};

// Passing a named function as an argument to setTimeout
// window.setTimeout(sayHello, 1000);
// don't write sayHello() ^ here! It will run immediately and its return value will
// be passed into setTimeout

// Passing an anonymous or inline function as an argument to setTimeout
// window.setTimeout(function(){ console.log('Anonymous function!');  }, 2000);


const runNicely = function( functionToRun, timesToRun=1 ){
  console.log('Hi! I am excited to run your function for you!');

  for( let i = 0; i < timesToRun; i++ ){
    functionToRun();  // Run the argument we were given, as a function
  }

  console.log('It was a pleasure to run your function! Have a fantastic day!');
};



const each = function(arrayToLoopOver, functionToRun){

  for( let i = 0; i < arrayToLoopOver.length; i++ ){
    const currentElem = arrayToLoopOver[i];
    // console.log( currentElem );

    // Run the function that was passed in as the second argument, and
    // WE pass in to this function the current element, for it to do
    // whatever it wants with. We also pass in the current loop counter
    // value, in case it needs to know which index position we are up to.
    functionToRun( currentElem, i );

  }

};

const arr = [ 'one', 'two', 'three', 'four' ];

each(arr, function( elem, pos ){
  console.log( pos,  elem + elem );
});

// arr.each do |elem|
//   puts elem
// end
