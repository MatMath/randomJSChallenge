const expect = require('expect.js');
const { isChainSymetrical, countAllInSubChain } = require('../codility/winterLights');

describe.only('testing the winterLights challenge', () => {
  it('test the isChainSymetrical', () => {
    expect(isChainSymetrical([6])).to.be(1);
    expect(isChainSymetrical([0])).to.be(1);
    expect(isChainSymetrical([1, 3, 1])).to.be(1);
    expect(isChainSymetrical([0, 3, 1])).to.be(0);
    expect(isChainSymetrical([0, 0, 0, 2])).to.be(0);
    expect(isChainSymetrical([0, 0, 0, 2, 2])).to.be(1);
  });

  it('Test the Sub division of the array', () => {
    expect(countAllInSubChain([1, 2, 3, 4, 5], 2)).to.eql(0);
    expect(countAllInSubChain([1, 2, 3, 4, 5], 3)).to.eql(0);
    expect(countAllInSubChain([1, 1, 1], 2)).to.eql(2);
    expect(countAllInSubChain([1, 2, 1], 2)).to.eql(0);
    expect(countAllInSubChain([1, 2, 1, 3, 3], 2)).to.eql(1);
  });
});
