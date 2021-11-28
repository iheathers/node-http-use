const express = require('express');

const {
  getCart,
  postCart,
  postOrder,
  getOrders,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getHomePage);

router.get('/orders', getOrders);
router.post('/orders', postOrder);

router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/delete-cart-item', deleteCartItem);

module.exports = router;
