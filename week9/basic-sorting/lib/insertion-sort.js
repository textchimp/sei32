// Loop through each element

// store the current item value so it can be placed correctly
// in the sorted portion of the array

// Loop backward through the sorted portion of the array
// and scoot everything over until you find the right place to
// insert the value you're working with

// Copy each item to the next slot over, as long as the value is smaller
// than the item in the sorted array we're looking at (items[j] > value)

// We can now insert the item in its sorted location

// Remember to return the list!

const insertionSort = arr => {

  let totalIterations = 0;

  for( let i = 0; i < arr.length; i++ ){
    const currentElem = arr[i];

    // console.log('sub-array:', arr.slice(0, i));
    for( var j = i-1; j >= 0 && arr[j] > currentElem; j-- ){
      arr[j + 1] = arr[j];

      totalIterations++;
    }
    console.log('j after inner loop:', j);
    console.log('arr after inner loop, before set:', arr);
    console.log(`arr[j+1 = ${j+1}] = ${currentElem}`);

    arr[j + 1] = currentElem;
    console.log('arr after inner loop, after set:', arr);

  } // outer for

  console.log({totalIterations});

  return arr;
};

module.exports = insertionSort;
