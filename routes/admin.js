const express = require('express');

const adminRouter = express.Router();

const products = [];

adminRouter.get('/add-product', (req, res, next) => {
  console.log('Route /add-product', 'GET', req.body);
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    productCSS: true,
    isAddProduct: true,
  });
});

adminRouter.post('/add-product', (req, res, next) => {
  console.log('Route /add-product', 'POST', req.body);

  products.push(req.body);

  res.redirect('/');
});

module.exports = {
  adminRouter,
  products,
};
