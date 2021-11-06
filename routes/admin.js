const path = require('path');
const express = require('express');

const rootDir = require('../utils/path');
const { appendFile } = require('fs');

const adminRouter = express.Router();

const products = [];

adminRouter.get('/add-product', (req, res, next) => {
  console.log('Route /add-product', 'GET', req.body);
  res.render('add-product');
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
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
