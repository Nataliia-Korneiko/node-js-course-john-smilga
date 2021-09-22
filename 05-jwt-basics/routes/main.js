const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');
const auth = require('../middleware/auth');

router.post('/login', login);
router.get('/dashboard', auth, dashboard);

module.exports = router;
