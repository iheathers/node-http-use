const express = require('express');
const {
  getProducts,
  getAddProduct,
  postAddProduct,
} = require('../controllers/admin');

const adminRouter = express.Router();

adminRouter.get('/product-list', getProducts);
adminRouter.get('/add-product', getAddProduct);
adminRouter.post('/add-product', postAddProduct);

module.exports = {
  adminRouter,
};
