// Remote interview via a code sharing tool. (30ish min)
const expect = require('expect.js');

/**
 * Let's write an "asyncMap" utility function for the team. 
 *
 * Similar to the Array.prototype.map() method, 
 * it would apply a function to each element of the Array,
 * to return a new Array.
 *
 * We don't want to use Promises, only callbacks.
 */

// YOU NEED TO DEFINE THE PARAMETERS
function asyncMap(data, add1Async, finalCallback, limit = data.length) {
  
  // YOUR CODE HERE
  let nbToReceive = data.length;
  let completedItem = 0;
  
  const finalArray = [];
  
  let lastVisited = 0;
  
  for (let index = 0; index < limit; index++) {
    const callback = (i) => (value) => {
      finalArray[i] = value;
      completedItem++;

      if(nbToReceive === completedItem) return finalCallback(finalArray);

      lastVisited++;
      if(lastVisited < nbToReceive) {
        return add1Async(data[lastVisited], callback(lastVisited));
      }
    };
    lastVisited = index;
    add1Async(data[index], callback(index));
  }
}

 
/**
 * Below is an example of another developer using the utility function.
 * Feel free to edit those lines to explore edge cases. (specialy the data)
 */

// The `setTimeout` is used to "simulate" the asynchronicity.
function add1Async(value, callback) {  
  setTimeout(() => {
    callback(value + 1)    
  }, Math.random() * 100)
}

describe('Making Async Map without promises', () => {
  it('map in an item with buffer limit', (done) => {
    const data = [1, 2, 3, 4, 5]
    function finalCallback(results) {
      // It should log: [2, 3, 4, 5, 6]
      expect(results).to.eql([2, 3, 4, 5, 6]);
      done();
    }
    asyncMap(data, add1Async, finalCallback, 3);
  })

  it('map in an item with no buffer limit', (done) => {
    const data = [1, 2, 3, 4, 5]
    function finalCallback(results) {
      // It should log: [2, 3, 4, 5, 6]
      expect(results).to.eql([2, 3, 4, 5, 6]);
      done();
    }
    asyncMap(data, add1Async, finalCallback);
  })
});