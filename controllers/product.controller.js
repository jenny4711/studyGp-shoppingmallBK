const Product = require("../models/Product");
const productController = {};
const PAGE_SIZE = 5;

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    await product.save();
    res.status(200).json({ status: "product-success", product });
  } catch (error) {
    res.status(400).json({ status: "product-fail" });
  }
};

productController.getProduct = async (req, res) => {
  try {
    const { page, name } = req.query;
    const condi = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(condi);

    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      // skip - 내가 스킵하고싶은 번호를 스킵할수있다.
      // limit- 받고싶은데이터가 최개몇개까지 보주싶은가.

      // 최종 몇개 페이지
      // 데이터가 총  몇개있는지
      const totalItemNum = await Product.find(condi).count();
      // 데이터 총  개수 / PAGE_SIZE
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

      response.totalPageNum = totalPageNum;
    }
    const productList = await query.exec();
    response.data = productList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "product-fail" });
  }
};



productController.getDetail = async (req, res) => {
  try {
    const getId = req.params.id;
    const product = await Product.findById(getId);

    if (!product) {
      return res
        .status(404)
        .json({ status: "Not Found!!!!", message: "Item doesn't exist!!!!" });
    }
    res.status(200).json({ status: "productDetail-success", data: product });
  } catch (error) {
    res.status(400).json({ status: "productDetail-fail" });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      { sku, name, size, image, category, description, price, stock, status },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "Item doesn't exist!" });
    }
    res.status(200).json({ status: "updateProduct-success", data: product });
  } catch (error) {
    res
      .status(400)
      .json({ status: "updateProduct-Fail!", error: error.message });
  }
};
productController.updateIsDeleted = async (req, res) => {
  try {
    const productId = req.params.id;
    const { IsDeleted } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { IsDeleted });
    if (!product) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "Item doesn't exist!" });
    }
    res.status(200).json({ status: "updateIsDeleted-success", data: product });
  } catch (error) {
    res
      .status(400)
      .json({ status: "updateIsDeleted-Fail!", error: error.message });
  }
};
productController.checkStock = async (item) => {
  const product = await Product.findById(item.productId);

  if (product.stock[item.size] < item.qty) {
    return {
      isVerify: false,
      message: `${product.name} 의 ${item.size} 재고가 부족합니다.`,
    };
  }
  const newStock = { ...product.stock };

  newStock[item.size] -= item.qty;
  product.stock = newStock;

  await product.save();

  return { isVerify: true };
};

productController.checkItemListStock = async (itemList) => {
  const insufficientStockItems = [];

  await Promise.all(
    itemList.map(async (item) => {
      const stockCheck = await productController.checkStock(item);
      if (!stockCheck.isVerify) {
        insufficientStockItems.push({ item, message: stockCheck.message });
      }

      return stockCheck;
    })
  );

  return insufficientStockItems;
};

module.exports = productController;
