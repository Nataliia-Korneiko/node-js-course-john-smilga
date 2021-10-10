const { StatusCodes } = require('http-status-codes');
const Review = require('../models/review');
const Product = require('../models/product');
const { checkPermissions, isTokenValid } = require('../utils');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name company price',
  });
  // .populate({
  //   path: 'user',
  //   select: 'name',
  // });

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id: ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const createReview = async (req, res) => {
  const {
    body,
    body: { product: productId },
  } = req;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  // юзер может добавить review продукта только один раз
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product');
  }

  req.body.user = req.user.userId;
  const review = await Review.create(body);

  res.status(StatusCodes.CREATED).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id: ${reviewId}`);
  }

  // юзер может обновить только свое review
  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id: ${reviewId}`);
  }

  // юзер может удалить только свое review
  checkPermissions(req.user, review.user);
  await review.remove();

  res.status(StatusCodes.OK).json({ msg: 'Review removed' });
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
