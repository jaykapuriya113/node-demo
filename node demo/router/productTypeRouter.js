const express = require("express");
const productTypeController = require("../controller/productTypeController");
const router = express.Router();

router.route("/getAllProduct").get(productTypeController.getAllProductType);
router.route("/").post(productTypeController.createProductType);

router.route("/:id").delete(productTypeController.deleteProductType);
router.route("/:id").patch(productTypeController.updateProductType);
module.exports = router;
