const express = require('express');

const {
  getCart,
  getOrders,
  getProducts,
  getHomePage,
  getProductDetail,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getHomePage);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

module.exports = router;
