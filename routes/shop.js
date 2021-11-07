const express = require('express');

const { getCart, getProducts, getHomePage } = require('../controllers/shop');

const router = express.Router();

router.get('/', getHomePage);
router.get('/cart', getCart);
router.get('/products', getProducts);

module.exports = router;
