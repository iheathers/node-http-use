const express = require('express');
const { getAddProduct, postAddProduct } = require('../controllers/products');

const adminRouter = express.Router();

adminRouter.get('/add-product', getAddProduct);

adminRouter.post('/add-product', postAddProduct);

module.exports = {
  adminRouter,
};
