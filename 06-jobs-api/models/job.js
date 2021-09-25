const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      maxLength: 50,
      required: [true, 'Please provide company name'],
    },
    position: {
      type: String,
      maxLength: 100,
      required: [true, 'Please provide position'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide user'],
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('job', jobSchema);
