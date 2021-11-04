const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateUser, authorizeRoles('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updateUserPassword', authenticateUser, updateUserPassword);
router.get('/:id', authenticateUser, getSingleUser); // ставим роутер в конец списка

module.exports = router;
