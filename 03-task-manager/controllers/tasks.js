const Task = require('../models/task');
const asyncWrapper = require('../middleware/async-wrapper');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const { body } = req;
  const task = await Task.create(body);

  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { body } = req;
  const task = await Task.findOneAndUpdate({ _id: taskID }, body, {
    new: true, // вернет обновленный объект
    runValidators: true, // валидация по схеме
  });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const editTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { body } = req;
  const task = await Task.findOneAndUpdate({ _id: taskID }, body, {
    new: true,
    runValidators: true, // валидация по схеме
    overwrite: true, // возьмет изначальное значение из схемы
  });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  editTask,
};
