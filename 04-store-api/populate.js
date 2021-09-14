const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');
require('dotenv').config();

const { DB_CONNECTION } = process.env;

const start = async () => {
  try {
    await connectDB(DB_CONNECTION);
    await Product.deleteMany(); // удаляем все продукты из db
    await Product.create(jsonProducts); // создаем продукты из json в db
    console.log('Successful operation');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
