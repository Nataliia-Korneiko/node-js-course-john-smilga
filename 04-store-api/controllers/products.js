const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async error'); // ошибка сработает в файле error-handler.js
  // const products = await Product.find({ featured: true });
  // const products = await Product.find({ name: 'accent chair' });

  // const search = 'ab';
  // const products = await Product.find({
  //   name: { $regex: search, $options: 'i' },
  // });

  // const products = await Product.find({}).sort('name'); // сортировка а-я
  // const products = await Product.find({}).sort('-name price'); // сортировка я-а
  // const products = await Product.find({}).select('name price'); // отдаем на фронт только определенные поля

  // const products = await Product.find({})
  //   .sort('name')
  //   .select('name price')
  //   .limit(10) // отдаем на фронт по 10
  //   .skip(1); // пропускаем первый продукт

  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {}; // если нет таких query параметров, вернет все продукты

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // находит все продукты по буквам в query параметрах
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // console.log(numericFilters);
    // console.log(filters);

    const options = ['price', 'rating'];

    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-'); // деструктуризация массива

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // console.log(queryObject); // { price: { '$gt': 40 }, rating: { '$gte': 4 } }

  let result = Product.find(queryObject);

  if (sort) {
    // console.log(sort); // name, -price
    const sortList = sort.split(',').join(' ');
    // console.log(sortList); // name  -price
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt'); // сортировка по дате создания продукта
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
