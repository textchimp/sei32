function binarySearch(arr, element){

  let start = 0;
  let end = arr.length - 1;
  let midPoint = Math.floor((start + end) / 2);

  while(arr[midPoint] !== element && start < end) {
    if (element < arr[midPoint]) {
      end = midPoint - 1;
    } else {
      start = midPoint + 1;
    }
    midPoint = Math.floor((start + end) / 2);
  }

  return (arr[midPoint] === element) ? midPoint : -1;
}

function recursiveBinarySearch(arr, element, midPoint=Math.floor((arr.length-1)/2), start=0, end=arr.length-1){
  // console.log({arr, element, midPoint, start, end}); // Use this a lot.

  if (arr[midPoint] === element) {
    return midPoint;
  }

  if (start >= end) {
    return -1;
  }

  if (element > arr[midPoint]) {
    start = midPoint + 1;
  } else {
    end = midPoint - 1;
  }

  midPoint = Math.floor((start + end) / 2);
  return recursiveBinarySearch(arr, element, midPoint, start, end);
}

module.exports = {
    binarySearch,
    recursiveBinarySearch
}




describe('Binary Search', ()=>{
    it('returns the index of found elements', ()=>{
        const things = [1,3,5,7,9];
        expect(binarySearch(things, 3)).to.equal(1);
        expect(binarySearch(things, 7)).to.equal(3);
        expect(binarySearch(things, 9)).to.equal(4);
    });
    it('returns negative one for unfound elements', ()=>{
        const things = [1,3,5,7,9];
        expect(binarySearch(things, 4)).to.equal(-1);
        expect(binarySearch(things, 99)).to.equal(-1);
        expect(binarySearch(things, 1)).to.equal(0);
    });
});
describe('Recursive Binary Search', ()=>{
    it('returns the index of found elements', ()=>{
        const things = [1,3,5,7,9];
        expect(recursiveBinarySearch(things, 3)).to.equal(1);
        expect(recursiveBinarySearch(things, 7)).to.equal(3);
        expect(recursiveBinarySearch(things, 9)).to.equal(4);
    });
    it('returns negative one for unfound elements', ()=>{
        const things = [1,3,5,7,9];
        expect(recursiveBinarySearch(things, 4)).to.equal(-1);
        expect(recursiveBinarySearch(things, 99)).to.equal(-1);
        expect(recursiveBinarySearch(things, 1)).to.equal(0);
    });
});
