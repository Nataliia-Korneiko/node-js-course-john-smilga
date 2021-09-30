const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');
const {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');

// public/uploads
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image less than 1MB in size');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath); // загружаем картинку в public/uploads из postman {{URL}}/products/uploads

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

// cloudinary
const uploadProductImage = async (req, res) => {
  // console.log(req.files.image); // создается папка tmp
  // создаем папку file-upload в cloudinary (физически)

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath); // unlinkSync - удаляет файл из папки tmp
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } }); // result.secure_url - путь к файлу на cloudinary
};

module.exports = {
  uploadProductImage,
};
