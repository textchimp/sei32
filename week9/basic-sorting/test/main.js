const bubbleSort = require('../lib/bubble-sort');
const insertionSort = require('../lib/insertion-sort');

const expect  = require('chai').expect;

describe('Bubble Sort', ()=>{
  it('should sort the array', ()=>{
    const myArray = [12,6,3,78,13,8];
    const sorted = bubbleSort(myArray);
    expect(sorted).to.deep.equal([3,6,7,8,12,13]);
    const otherArray = [-3, -1, 5, 100];
    const otherSorted = bubbleSort(otherArray);
    expect(otherSorted).to.deep.equal([-3, -1, 5, 100]);
  })
});

describe('Insertion Sort', ()=>{
  it('should sort the array', ()=>{
    const myArray = [12,6,3,7,13,8];
    const sorted = insertionSort(myArray);
    expect(sorted).to.deep.equal([3,6,7,8,12,13]);
    const otherArray = [-3, -1, 5, 100];
    const otherSorted = insertionSort(otherArray);
    expect(otherSorted).to.deep.equal([-3, -1, 5, 100]);
  })
});
