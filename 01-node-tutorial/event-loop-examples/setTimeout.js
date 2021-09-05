// started operating system process
console.log('first'); // 1

setTimeout(() => {
  console.log('second'); // 3
}, 0);

console.log('third'); // 2
// completed and exited operating system process
