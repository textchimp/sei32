
const bubbleSort  =  arr => {

  let didSwap = true;
  let totalIterations = 0;

  let endIndex = arr.length - 1;

  while( didSwap ){

    didSwap = false; // need to resetsu - this for each round!

    console.log('start', {totalIterations});

    for( let i = 0; i < endIndex ; i++ ){
      const currentElem = arr[ i   ];
      const nextElem    = arr[ i+1 ];

      if( nextElem < currentElem ){
        arr[i]   = nextElem;
        arr[i+1] = currentElem;  // swap!
        didSwap = true;
      }

      totalIterations++;
      console.log({totalIterations});
    } // for

    endIndex--;

    console.log(arr);

  } // while( didSwap )

  console.log({totalIterations});

  return arr;
};

module.exports = bubbleSort;
