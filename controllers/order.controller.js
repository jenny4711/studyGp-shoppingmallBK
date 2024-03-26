const Order = require("../models/Order");
const productController = require("./product.controller");
const { randomStringGenerator } = require("../utils/randomStringGenerator");

const orderController = {};
const PAGE_SIZE = 5;
orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { shipTo, contact, discountPrice,totalPrice, orderList } = req.body;

    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );

    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce(
        (total, item) => (total += item.message),
        ""
      );
      throw new Error(errorMessage);
    }

    const newOrder = new Order({
      userId,
      totalPrice,
      shipTo,
      contact,
      discountPrice,
      items: orderList,
      orderNum: randomStringGenerator(),
    });
    await newOrder.save();

    res
      .status(200)
      .json({ status: "createOrder-success", orderNum: newOrder.orderNum });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "createOrder-Fail", error: error.message });
  }
};

orderController.getOrderList = async (req, res) => {
  try {
    const { userId } = req;
    let order = await Order.find({ userId })
      .populate("items.productId")
      .populate("userId");

    if (!order) {
      return res
        .status(400)
        .json({ status: "Couldn't Find!", message: error.error });
    }
    res.status(200).json({ status: "success-Order", data: order });
  } catch (error) {
    res.status(400).json({ status: "getOrderList-Fail", message: error.error });
  }
};

orderController.getAllOrderList = async (req, res) => {
  try {
    const { page, ordernum } = req.query;
    const condi = ordernum ? { orderNum: ordernum } : {};
    let query = Order.find(condi)
      .populate("items.productId")
      .populate("userId");
    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await Order.find(condi).count();
      const totalPage = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPage;
    }
    const orderList = await query.exec();
    response.data = orderList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "AllOrder-fail", message: error });
  }
};
orderController.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }).populate(
      "items.productId"
    );

    if (!order) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "Item doesn't exist!" });
    }
    res.status(200).json({ status: "updateOrder-success", data: order });
  } catch (error) {
    res.status(400).json({ status: "updateOrder-fail", message: error });
  }
};

module.exports = orderController;
