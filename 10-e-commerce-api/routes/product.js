const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require('../controllers/product');
const { getSingleProductReviews } = require('../controllers/review');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.post('/', [authenticateUser, authorizeRoles('admin')], createProduct);
router.get('/', getAllProducts);
router.post(
  '/uploadImage',
  [authenticateUser, authorizeRoles('admin')],
  uploadProductImage
);
router.get('/:id', getSingleProduct);
router.patch(
  '/:id',
  [authenticateUser, authorizeRoles('admin')],
  updateProduct
);
router.delete(
  '/:id',
  [authenticateUser, authorizeRoles('admin')],
  deleteProduct
);

router.get('/:id/reviews', getSingleProductReviews);

module.exports = router;
