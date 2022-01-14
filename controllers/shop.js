const { Product } = require("../models/product");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render("shop/product-list", {
      pageTitle: "Shop Products",
      path: "/products",
      products: products,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getProductDetail = async (req, res, next) => {
  const productID = req.params.id;

  try {
    const product = await Product.findById(productID);

    if (product) {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products-detail",
        product: product,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getOrders = async (req, res, next) => {
  const orderList = await req.user.getOrders();

  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    orders: orderList,
  });
};

const postOrder = async (req, res, next) => {
  if (req.user.cart.items.length > 0) {
    await req.user.addOrder();
  }

  res.redirect("/orders");
};

const getHomePage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Digital Shop",
    path: "/",
  });
};

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    cart: cart,
  });
};

const postCart = async (req, res, next) => {
  const productID = req.body.productID.trim();

  try {
    const product = await Product.findById(productID);

    await req.user.addToCart(product);
  } catch (error) {
    console.log("postCart", { error });
  }

  res.redirect("/cart");
};

const deleteCartItem = async (req, res, next) => {
  const productID = req.body.productID.trim();

  await req.user.deleteCartItem(productID);

  res.redirect("/cart");
};

module.exports = {
  getCart,
  postCart,
  getOrders,
  postOrder,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
};
