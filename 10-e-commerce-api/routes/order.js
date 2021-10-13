const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  getCurrentUserOrders,
} = require('../controllers/order');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateUser, createOrder);
router.get('/', authenticateUser, authorizeRoles('admin'), getAllOrders);
router.get('/showAllMyOrders', authenticateUser, getCurrentUserOrders);
router.get('/:id', authenticateUser, getSingleOrder);
router.patch('/:id', authenticateUser, updateOrder);

module.exports = router;
