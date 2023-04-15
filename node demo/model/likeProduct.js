const mongoose = require("mongoose");

const likeProductSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
  likesQuantity: {
    type: Number,
    default: 0,
  },
  //   product: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Product',
  //   },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const LikeProduct = mongoose.model("LikeProduct", likeProductSchema);

module.exports = LikeProduct;
