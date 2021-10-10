const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review');
const { authenticateUser } = require('../middleware/auth');

router.post('/', authenticateUser, createReview);
router.get('/', getAllReviews);
router.get('/:id', getSingleReview);
router.patch('/:id', authenticateUser, updateReview);
router.delete('/:id', authenticateUser, deleteReview);

module.exports = router;
