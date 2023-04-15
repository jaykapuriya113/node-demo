const product = require("../model/productModel");
const productType = require("../model/productTypeModel");
const AppError = require("../errorHandler/AppError");
const mongoose = require("mongoose");
const Product = require("../model/productModel");

exports.createProductType = async (req, res, next) => {
  try {
    const pt = await productType.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: pt,
      },
    });
  } catch (err) {
    return next(new AppError("somthing went wrong", 404));
  }
};

exports.getAllProductType = async (req, res, next) => {
  try {
    const pt = await productType.find();

    res.status(201).json({
      status: "success",
      data: pt,
    });
  } catch (err) {
    return next(new AppError("Data does not exist", 404));
  }
};

exports.deleteProductType = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const product_Type = await productType.findById(req.params.id);
    console.log(product_Type);
    if (!product_Type) return next(new AppError("Product Type Does not exist"));
    console.log(product_Type._id);
    const products = await Product.find({ productType: productType._id });
    console.log(products);
    if (products.length > 0) {
      return next(
        new AppError("Product Type can't be deleted because it is in use")
      );
    }
    const product = await productType.findByIdAndDelete(productType._id);
    res.status(201).json({
      message: "Product Type is deleted successfully",
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.updateProductType = async (req, res, next) => {
  try {
    const pt = await productType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: pt,
      },
    });
  } catch (err) {
    return next(new AppError({ err }, 404));
  }
};
