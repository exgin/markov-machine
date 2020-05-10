/** Textual markov chain generator */

class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  makeChains() {
    // using a map to remove all duplicates
    let chain = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chain.has(word)) {
        chain.get(word).push(nextWord);
      } else {
        chain.set(word, [nextWord]);
      }
    }
    this.chain = chain;
  }

  // helper function to chose a random key
  static randomIndex(array) {
    if (array === undefined) {
      return undefined;
    } else {
      return array[Math.floor(Math.random() * array.length)];
    }
  }

  makeText(numWords = 100) {
    // turn our keys into an array
    let keys = Array.from(this.chain.keys());
    // pick out a random key indexs from our now array
    let key = MarkovMachine.randomIndex(keys);
    let final = [];

    while (final.length < numWords && key !== null) {
      final.push(key);
      key = MarkovMachine.randomIndex(this.chain.get(key));
    }

    // console.log(final.join(' '));
    return final.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};

let mm = new MarkovMachine('the cat in the hat');
mm.makeText();

mm.makeText((numWords = 50));
