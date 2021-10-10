const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide review rating'],
    },
    title: {
      type: String,
      maxLength: 100,
      trim: true,
      required: [true, 'Please provide review title'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide review comment'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'user',
    },
    product: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'product',
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('review', reviewSchema);
