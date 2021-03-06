// https://codility.com/programmers/task/winter_lights/
// Winter is coming and Victor is going to buy some new lights. In the store, lights are available in 10 colors, numbered from 0 to 9. They are connected together in a huge chain. Victor can choose any single segment of the chain and buy it.
//
// This task would be easy if it weren't for Victor's ambition. He wants to outdo his neighbors with some truly beautiful lights, so the chain has to look the same from both its left and right sides (so that both neighbors see the same effect).
//
// Victor is a mechanic, so after buying a segment of the chain, he can rearrange its lights in any order he wants. However, now he has to buy a chain segment that will satisfy above condition when its lights are reordered. Can you compute how many possible segments he can choose from?
//
// Write a function:
//
// function solution(S);
// that, given a description of the chain of lights, returns the number of segments that Victor can buy modulo 1,000,000,007. The chain is represented by a string of digits (characters from '0' to '9') of length N. The digits represent the colors of the lights. Victor can only buy a segment of the chain in which he can reorder the lights such that the chain will look identical from both the left and right sides (i.e. when reversed).
//
// For example, given:
//
//     S = "02002"
// the function should return 11. Victor can buy the following segments of the chain:
//
// "0", "2", "0", "0", "2", "00", "020", "200", "002", "2002", "02002"
// Note that a segment comprising a single "0" is counted three times: first it describes the subchain consisting of only the first light, then the subchain consisting of the third light and finally the subchain consisting of the fourth light. Also note that Victor can buy the whole chain ("02002"), as, after swapping the first two lights, it would become "20002", which is the same when seen from both from left and right.
//
// Assume that:
//
// string S consists only of digits (0−9);
// the length of S is within the range [1..200,000].
// Complexity:
//
// expected worst-case time complexity is O(N);
// expected worst-case space complexity is O(1) (not counting the storage required for input arguments).

// How I would do it???
// extract all item of 1,2,3,4... chain.length
// We can skip the Chain legth of 1 since it is by default symetrical.

const isChainSymetrical = (chain) => {
  // if chain is odd then we are allowed 1 odd number.
  // if chain is pair, we are allowed only pair number.
  const sumOfLight = chain.reduce((prev, curr) => {
    const tmp = [...prev]; // Functional stuff
    tmp[curr] = (tmp[curr] === undefined) ? 1 : tmp[curr] += 1;
    return tmp;
  }, []);
  if (chain.length % 2 === 0) {
    for (let i = 0; i < sumOfLight.length; i++) {
      if (sumOfLight[i] && sumOfLight[i] % 2 !== 0) {
        return 0;
      }
    }
    return 1;
  }
  let nbrOfOdd = 0; // we need exactly 1
  for (let i = 0; i < sumOfLight.length; i++) {
    if (sumOfLight[i] && sumOfLight[i] % 2 !== 0) {
      nbrOfOdd++;
    }
  }
  if (nbrOfOdd === 1) { return 1; }
  return 0;
};

const countAllInSubChain = (chain, nbr) => [...chain].map((item, index) => {
  if (index + nbr > chain.length) {
    return 0;
  }
  return isChainSymetrical([...chain].splice(index, nbr));
}).reduce((a, b) => a + b, 0);

const countAllSymetricSubChain = (chainString) => {
  const chain = chainString.split('').map(item => parseInt(item, 10));
  let base = chain.length;
  for (let i = 1; i < chain.length; i++) {
    base += countAllInSubChain(chain, i + 1);
  }
  return base;
};

module.exports = {
  countAllInSubChain,
  isChainSymetrical,
  countAllSymetricSubChain,
};
// function solution(S);
