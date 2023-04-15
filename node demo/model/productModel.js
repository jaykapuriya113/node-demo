const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ProductType",
  },
  productName: {
    type:String,
    required: [true,"A product must have a name"],
    unique: true,
    maxlength: [30,"A product must have less or equal then 40 characters"],

  },
  expireDate: {
    type: Date,
    // required:true,
  },
  price: {
    type:Number,
    required:[true,"A product must have a price"]
  },
  description: {
    type: String,
    trim: true,
    required:[true],
  },
  timestamp:{
    type:Date,
    default:Date.now(),
  },
  imageCover: {
    type: String,
    //   required: [true, 'A product must have a cover image'],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
