// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./04-names');
const sayHi = require('./05-utils');
const data = require('./06-alternative-flavor');
require('./07-mind-grenade');

console.log('data:', data);
console.log('names:', names);
sayHi('Susan');
sayHi(names.john);
sayHi(names.peter);
