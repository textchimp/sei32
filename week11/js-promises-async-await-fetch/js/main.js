console.log('loaded');

const waiter = (time, msg, { forceSuccess=false }={} ) => {

  // Our function does something asynchronous (in this example, using a setTimeout
  // to mimic making an AJAX request to a remote API and waiting for a response).
  // To signal to users of the function that they have to wait for the data, we
  // return a new Promise, and our setTimeout callback singals success or failure
  // by running either the resolve() or reject(). This in turn determines whether
  // it is the then() or catch() callback, which callers of the waiter() function
  // attach to it, are actualy run.
  return new Promise( (resolve, reject) => {
    console.log("In waiter()'s promise setup...");

    setTimeout( () => {

      const dice = Math.random();

      if( forceSuccess || dice > 0.5 ){
        // success!
        // This will cause the first attached then()'s callback to run, which will
        // receive the resolve's argument as its own
        return resolve({ dice, time, msg });
      } else {
        // fail :(
        // This will cause the first attached catch()'s callback to run
        return reject({ dice, time, msg, error: 'YA BLEW IT!' });
      }

      // This code will still run, after a resolve() or reject()
      // ...unless you return resolve() or return reject()
      console.log('Did we get here?');

    }, time);


  }); // end of Promise constructor

}; // waiter()


false && waiter(2000, 'first')
.then(
  // success function (resolve)
  data => {
    console.log('First then callback running!', data);
    return 'return value of success callback'
  },
  // // error function (reject)
  // err => {
  //   console.log('ERROR/reject from waiter()', err);
  //   return 'return value of error callback'
  // }
)
// Attaching a .catch function() like this to the above then()
// is very similar to specifying a second (failure/reject)
// callback to the above then().... with some subtle and
// tricky differences. See here:
//
.catch( err => {
  console.log('First catch() running: ', err);
  // throw new Error('error from first catch handler');
  return waiter(2000, 'second');
})
.then( data => {
  console.log('Second then callback running:', data);
})
.catch( err2 => {
  console.log('second catch callback, err2: ', err2);
});

const runWaiter = async () => {

  // Inside this function, we can now use the 'await' keyword before functions which
  // return a promise. Those functions will now return their resolve values, which
  // we can store into a variable, and JS will not run the next lines of code
  // *until they do* return their values! I.e. JS now behaves synchronously,
  // more like Ruby code.
  try {
    const data = await waiter(1000, 'first call' );
    console.log('first data:', data);

    const data2 = await waiter(2000, 'second call');
    console.log('second data:', data2);

  } catch( err ){
    console.warn('We got an error...', err);
  }

};

// const result = runWaiter();
// Although this function ^^ INTERNALLY waits for promises to resolve....
// // ....It returns immediately (it actually returns a new promise that resolves to the final
// return value of the runWaiter() function) and any code after it is immediately run.
// console.log('Hello', result);

fetch('http://numbersapiiiiii.com/42?json')
.then( res => {
  // A 404 response is still a 'successful' request in that it returns a valid
  // response (just not the response you want)
  // Only a network-level error (bad domain name, server down etc)
  // will skip this then() callback and go straight to the catch()
  if( res.status !== 200 ){
    console.log( 'Some kind of error: ' + res.status );
    return new Error('bad request error'); //res.status;
  } else {
    return res.json() // this will be the 'results' value in the next then() callback
  }
})
.then( results => console.log(results) )
.catch( err => console.warn('Bad request:', err) );

const getNumber = async (url) => {
  try {

    const res = await fetch(url);
    console.log({ res });

    const data = await res.json();
    console.log('finally:', { data });

  } catch( err ){
    // Any errors thrown in above code (or functions called by above code)
     // will cause it to stop running, transferring control to this catch block
    console.log('Got an error:', err);
  }

};

getNumber('http://numbersapi.com/asdasd?json');
