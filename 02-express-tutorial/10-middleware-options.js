const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/api/products', (req, res) => {
  res.send('<h1>Products</h1>');
});

app.get('/api/items', (req, res) => {
  res.send('<h1>Items</h1>');
});

app.listen(5000, () => {
  console.log('Server is listening on port: 5000');
});
