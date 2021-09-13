const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: [20, 'name can not be more than 20 characters'],
    required: [true, 'must provide name'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('task', taskSchema);
