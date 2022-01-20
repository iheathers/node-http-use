const { Order } = require("../models/order");
const { Product } = require("../models/product");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.render("shop/product-list", {
      pageTitle: "Shop Products",
      path: "/products",
      products: products,
      isAuthenticated: req.session.isLoggedIn,
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
        isAuthenticated: req.session.isLoggedIn,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getOrders = async (req, res, next) => {
  const orderList = await Order.find({ "user.userId": req.user._id })
    .populate("items.product.productId")
    .exec();

  console.log({ orderList });

  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    orders: orderList,
    isAuthenticated: req.session.isLoggedIn,
  });
};

const postOrder = async (req, res, next) => {
  const cart = await req.user.getCart();

  const items = cart.map((item) => {
    return {
      product: {
        productId: item.id,
      },
      quantity: item.quantity,
    };
  });

  const order = new Order({
    user: {
      userId: req.user._id,
    },
    items: items,
  });

  await order.save();

  await req.user.clearCart();

  res.redirect("/orders");
};

const getHomePage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Digital Shop",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    cart: cart,
    isAuthenticated: req.session.isLoggedIn,
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
