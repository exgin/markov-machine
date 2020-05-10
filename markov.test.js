const { MarkovMachine } = require('./markov');

describe('test MM class', function () {
  let mm;
  beforeAll(function () {
    mm = new MarkovMachine('the cat in the hat');
  });

  test('should be a string', function () {
    expect(mm.makeText()).toEqual(expect.any(String));
  });

  test('next word after last should contain a null value', function () {
    expect(mm.chain.get('hat')[0]).toBeNull();
  });
});
