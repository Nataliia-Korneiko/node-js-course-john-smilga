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

// aggregation
reviewSchema.statics.calculateAverageRating = async function (productId) {
  // console.log(productId); // id продукта при добавлении или удалении продукта
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  // console.log(result);

  try {
    await this.model('product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0), // averageRating - средний рейтинг продукта
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// updateReview
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

// deleteReview
reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('review', reviewSchema);
