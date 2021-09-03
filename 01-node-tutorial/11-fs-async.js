const { readFile, writeFile } = require('fs');
console.log('Start!');

readFile('./content/first.txt', 'utf8', (error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('result:', result);

  const first = result;
  readFile('./content/second.txt', 'utf8', (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    const second = result;
    writeFile(
      './content/result-async.txt',
      `Here is the result: ${first}, ${second}`,
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        }

        console.log('result:', result);
        console.log('Done with this task!');
      }
    );
  });
});

console.log('Starting next task!');
