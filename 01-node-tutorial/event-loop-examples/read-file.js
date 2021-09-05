const { readFile } = require('fs');

console.log('Started a first task!');

readFile('../content/first.txt', 'utf8', (error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('result:', result);
  console.log('Completed first task!');
});

console.log('Starting next task!');
