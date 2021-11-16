const express = require('express');
const {
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
} = require('../controllers/admin');

const adminRouter = express.Router();

adminRouter.get('/product-list', getProducts);

adminRouter.get('/add-product', getAddProduct);
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/edit-product/:productID', getEditProduct);

module.exports = {
  adminRouter,
};
