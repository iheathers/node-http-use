const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/product-list', {
    pageTitle: 'Products',
    path: '/products',
    products: products,
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
  getProducts,
  getHomePage,
};
