const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const discountController = require("../controllers/discount.controller");

router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  discountController.createCode
);
router.get(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  discountController.showCodeAll
);

router.get(
  "/:id",
  authController.authenticate,
  discountController.showCodeCheck
);
router.delete(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  discountController.deleteCode
);


module.exports=router;