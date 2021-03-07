import * as expect from 'expect.js';
import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () =>  {
  it('should return the mutated array', () =>  {
    expect(fizzbuzz()).to.eql([]);
  });

  it('should return fizz if the index is a multiple of three', () =>  {
    expect(fizzbuzz(4)).to.eql(['1', '2', 'fizz', '4']);
  });

  it('should return fizz if the index is a multiple of five', () =>  {
    expect(fizzbuzz(6)).to.eql(['1', '2', 'fizz', '4', 'buzz', 'fizz']);
  });

  it('should return fizzbuzz if the index is a multiple of three and five', () =>  {
    expect(fizzbuzz(16)[14]).to.eql('fizzbuzz');
  });

  it('should return fizzbuzz if the index is a multiple of three and five and five', () =>  {
    expect(fizzbuzz(3*5*5+1)[3*5*5-1]).to.eql('fizzbuzz');
  });
});