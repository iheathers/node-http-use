const { Cart } = require('../models/cart');
const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render('shop/product-list', {
      pageTitle: 'Shop Products',
      path: '/products',
      products: products,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getProductDetail = async (req, res, next) => {
  const productID = req.params.id;

  const product = await Product.findByPk(productID);

  res.render('shop/product-detail', {
    pageTitle: 'Product Detail',
    path: '/products-detail',
    product: product,
  });
};

const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

const getHomePage = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Digital Shop',
    path: '/',
  });
};

const getCart = async (req, res, next) => {
  const cartItems = [];

  const cart = await Cart.fetchCart();

  for (const item of cart.items) {
    const product = await Product.fetchProductWithId(item.id);

    cartItems.push({
      product: product,
      quantity: item.quantity,
    });
  }

  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    cart: cartItems,
    totalPrice: cart.totalPrice,
  });
};

const postCart = async (req, res, next) => {
  const productID = req.body.productID.trim();
  const product = await Product.fetchProductWithId(productID);

  Cart.addProduct(productID, product?.price);

  res.redirect('/cart');
};

const deleteCartItem = async (req, res, next) => {
  const productID = req.body.productID.trim();
  const productPrice = +req.body.productPrice.trim();

  Cart.deleteProductFromCart(productID, productPrice);

  res.redirect('/cart');
};

module.exports = {
  getCart,
  postCart,
  getOrders,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
};
