const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [100, 'Name can not be more than 100 characters'],
      trim: true,
      required: [true, 'Please provide product name'],
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      maxLength: [1000, 'Description can not be more than 1000 characters'],
      required: [true, 'Please provide product description'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg', // http://localhost:5000/uploads/example.jpeg
    },
    category: {
      type: String,
      enum: ['office', 'kitchen', 'bedroom'],
      required: [true, 'Please provide product category'],
    },
    company: {
      type: String,
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Please provide product company'],
    },
    colors: {
      type: [String],
      default: ['#000000'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please add user'],
      ref: 'user',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } } // virtuals - добавляет массив reviews в getSingleProduct
);

// для controllers -> getSingleProduct -> populate('reviews')
productSchema.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
  // match: { rating: 3 }, // покажет все reviews только с rating: 3
});

// при удалении продукта удаляем все reviews данного продукта
productSchema.pre('remove', async function (next) {
  await this.model('review').deleteMany({ product: this._id });
});

module.exports = mongoose.model('product', productSchema);
