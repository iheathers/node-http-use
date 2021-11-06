const express = require('express');

const { products } = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Request to /', 'GET', products);
  console.log({ products });
  res.render('shop', {
    title: 'My dynamic shop',
    products,
    pageTitle: 'Shop',
    path: '/',
    hasProduct: products.length > 0,
    isShop: true,
  });
});

module.exports = router;
