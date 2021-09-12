const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // console.log('User hit the resource');
  res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
  res.status(200).send('<h1>About Page</h1>');
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(5000, () => {
  console.log('Server is listening on port: 5000');
});
