const express = require('express');
const {
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
} = require('../controllers/admin');

const adminRouter = express.Router();

adminRouter.get('/product-list', getProducts);

adminRouter.get('/add-product', getAddProduct);
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/edit-product/:productID', getEditProduct);
adminRouter.post('/edit-product', postEditProduct);

module.exports = {
  adminRouter,
};
