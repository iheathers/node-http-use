const express = require('express');

const {
  getCart,
  getOrders,
  getProducts,
  getHomePage,
  getProductDetail,

  postCart,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getHomePage);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

router.post('/cart', postCart);

module.exports = router;
