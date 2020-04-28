const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = () => Promise
  .resolve()
  .then(() => readFile('./data/dujitang.txt', 'utf8'))
  .then(content => content.split(/\n/g))