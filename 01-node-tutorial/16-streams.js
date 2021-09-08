const { createReadStream } = require('fs');

// default 64kb
// last buffer - remainder
// highWaterMark - control size

const stream = createReadStream('./content/big.txt');
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 });
// const stream = createReadStream('./content/big.txt', { encoding: 'utf8' });

stream.on('data', (result) => {
  console.log(result);
});

stream.on('error', (error) => console.log(error));
