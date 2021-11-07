const { Product } = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const product = new Product(title);
  product.save();

  res.redirect('/');
};

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/products', {
    pageTitle: 'Shop',
    path: '/',
    products: products,
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
