const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  editTask,
} = require('../controllers/tasks');

router.get('/', getAllTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);
router.put('/:id', editTask);

module.exports = router;
