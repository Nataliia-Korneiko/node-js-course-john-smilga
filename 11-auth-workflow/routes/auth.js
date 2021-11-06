const express = require('express');
const router = express.Router();
const { register, login, logout, verifyEmail } = require('../controllers/auth');
const { authenticateUser } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
// router.get('/logout', logout);
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);

module.exports = router;
