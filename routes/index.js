const express = require("express")
const router = express.Router()
const userApi = require('./user.api')
const authApi = require('./auth.api')
const productApi = require('./product.api')
const cartApi=require("./cart.api")
const orderApi=require("./order.api")
const reqApi=require("./req.api")
const discountApi = require("./discount.api")
const boardApi = require("./board.api")

router.use("/user",userApi)
router.use("/auth",authApi)
router.use("/product",productApi)
router.use("/cart",cartApi)
router.use("/order",orderApi)
router.use("/reqItem",reqApi)
router.use("/discount",discountApi)
router.use("/board",boardApi)




module.exports=router;

