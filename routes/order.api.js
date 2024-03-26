const express = require("express");
const authController = require('../controllers/auth.controller');
const router = express.Router();
const orderController=require("../controllers/order.controller")
router.post("/",authController.authenticate,orderController.createOrder)
router.get("/",authController.authenticate,orderController.getOrderList)
router.get("/all",authController.authenticate,authController.checkAdminPermission,orderController.getAllOrderList)
router.put("/:id",authController.authenticate,authController.checkAdminPermission,orderController.updateOrder)
module.exports=router