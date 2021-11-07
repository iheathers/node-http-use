const { Product } = require('../models/product');

const getAddProduct = (req, res, next) => {
  console.log('Route /add-product', 'GET', req.body);

  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  console.log('Route /add-product', 'POST', req.body);

  const title = req.body.title;
  const product = new Product(title);
  product.save();

  res.redirect('/');
};

const getProducts = async (req, res, next) => {
  console.log('Route /', 'GET', req.body);

  const products = await Product.fetchAll();
  console.log('fetchall', { products });

  res.render('shop', {
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
