const express = require("express");
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/product.controller");
const router = express.Router();
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.createProduct
);
router.get("/", productController.getProduct);

router.get("/:id", productController.getDetail);
router.put(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.updateProduct
);

router.put(
  "/isDeleted/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.updateIsDeleted
);

module.exports = router;
