const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/products');
const { uploadProductImage } = require('../controllers/uploads');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.post('/uploads', uploadProductImage);

module.exports = router;
