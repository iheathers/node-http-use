const express = require('express');

const {
  getCart,
  postCart,
  getOrders,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getHomePage);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

router.post('/cart', postCart);
router.post('/delete-cart-item', deleteCartItem);

module.exports = router;
