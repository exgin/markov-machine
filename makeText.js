/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function genMM(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function cat(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      console.log(`Cannot read file | Error: ${error}`);
      process.exit(1);
    } else {
      genMM(data);
    }
  });
}

async function webCat(path) {
  let res;

  try {
    res = await axios.get(path);
    genMM(res.data);
  } catch (error) {
    console.log(`Cannot read this webpage | Error: ${error}`);
    process.exit(1);
  }
}

if (process.argv[2] === 'file') {
  cat(process.argv[3]);
} else if (process.argv[2] === 'url') {
  webCat(process.argv[3]);
} else {
  console.error(`Unknown command | ${process.argv[2]} | entered`);
  process.exit(1);
}
