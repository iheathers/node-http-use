const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('admin/product-list', {
    pageTitle: 'Admin Products',
    path: '/admin/product-list',
    products: products,
  });
};

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const { title, price, description, imageURL } = req.body;
  const product = new Product(title, price, imageURL, description);
  product.save();

  res.redirect(301, '/');
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
};
