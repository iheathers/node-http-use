const { Cart } = require('../models/cart');
const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/product-list', {
    pageTitle: 'Products',
    path: '/products',
    products: products,
  });
};

const getProductDetail = async (req, res, next) => {
  const productID = req.params.id;

  const product = await Product.fetchProductWithId(productID);

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

const getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};

const postCart = async (req, res, next) => {
  const productID = req.body.productID.trim();

  const product = await Product.fetchProductWithId(productID);

  Cart.addProduct(productID, product?.price);

  res.redirect('/cart');
};

module.exports = {
  getCart,
  getOrders,
  getProducts,
  getHomePage,
  getProductDetail,

  postCart,
};
