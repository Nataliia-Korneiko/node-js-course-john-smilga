const express = require('express');
const logger = require('./logger');
const authorize = require('./authorize');

const app = express();

// app.use('/api', logger);
app.use([logger, authorize]);

// http://localhost:5000/?user=john
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/api/products', (req, res) => {
  res.send('<h1>Products</h1>');
});

// http://localhost:5000/api/items?user=john
app.get('/api/items', (req, res) => {
  console.log(req.user);

  res.send('<h1>Items</h1>');
});

app.listen(5000, () => {
  console.log('Server is listening on port: 5000');
});
