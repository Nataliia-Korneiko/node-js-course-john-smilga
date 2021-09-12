const express = require('express');
const router = express.Router();
const { auth } = require('./controller/auth');

router.post('/', auth);

module.exports = router;
