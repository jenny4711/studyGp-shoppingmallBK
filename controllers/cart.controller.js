const Cart = require("../models/Cart");

const cartController = {};
cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, size, qty } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }
    const existItem = cart.items.find(
      (item) => item.productId.equals(productId) && item.size === size
    );
    if (existItem) {
      throw new Error("아이템이 이미 카트에 담겨있습니다. ");
    }

    cart.items = [...cart.items, { productId, size, qty }];
    await cart.save();
    res.status(200).json({
      status: "AddCart-success",
      data: cart,
      cartItemQty: cart.items.length,
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.getCartList = async (req, res) => {
  try {
    const { userId } = req;
    let cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .populate("userId");
    console.log(cart);
    if (!cart) {
      return res
        .status(400)
        .json({ status: "Couldn't Find!", message: error.error });
    }
    res.status(200).json({ status: "success-Cart", data: cart });
  } catch (error) {
    res.status(400).json({ status: "getCart-fail" });
  }
};
cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const itemId = req.params.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ status: "Couldn't Find Cart!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(400).json({ status: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ status: "Deleted", data: cart });
  } catch (error) {
    res
      .status(400)
      .json({ status: "deletedCart-fail", message: error.message });
  }
};

cartController.updateCartQty = async (req, res) => {
  try {
    const { userId } = req;
    const itemId = req.params.id;
    const { qty } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ status: "couldn't Find Cart!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(400).json({ status: "Item not found in cart" });
    }
    cart.items[itemIndex].qty = qty;
    await cart.save();
  res.status(200).json({status:"updated-qty",data:cart})
  } catch (error) {
    res.status(400).json({ status: "updateQty-fail", message: error.message });
  }
};

module.exports = cartController;

