const Product = require("../model/productModel");
const AppError = require("../errorHandler/AppError");
const ProductType = require("../model/productTypeModel");

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find().populate("productType");
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 500));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    return next(new AppError("something went wrong", 500));
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 500));
  }
};

exports.findProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 500));
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 500));
  }
};

exports.mostRecentProduct = async (req, res, next) => {
  try {
    const recentValue = await Product.find().sort({ timestamp: -1 }).limit(1);
    res.status(200).json({
      status: "success",
      data: {
        recentValue,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 500));
  }
};
exports.getProductByProductType = async (req, res, next) => {
  try {
    const product = await Product.find({ productType: req.params.id });
    console.log(product);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
