const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/product-list', {
    pageTitle: 'Products',
    path: '/products',
    products: products,
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

module.exports = {
  getCart,
  getOrders,
  getProducts,
  getHomePage,
};
