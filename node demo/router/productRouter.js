const express = require("express");
const producutController = require("../controller/productController");
const likeController = require("../controller/likeProductController");
const commentController = require("../controller/commentController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .post(producutController.createProduct)
  .get(producutController.getAllProduct);

router.route("/mostRecentProduct").get(producutController.mostRecentProduct);

router
  .route("/:id")
  .get(producutController.findProductById)
  .patch(producutController.updateProduct)
  .delete(producutController.deleteProduct);

router.route("/like").post(authController.protect, likeController.likeProduct);
router
  .route("/mostLikedProduct/:id")
  .get(authController.protect, likeController.mostLikedProduct);

// router.route("/comment").post(likeController.likeProduct);
// router.route("/giveMostComment/:id").get(likeController.giveMostComment);

router
  .route("/getProductByProductType/:id")
  .get(producutController.getProductByProductType);
module.exports = router;
