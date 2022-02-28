const express = require("express");
const {
  getProducts,
  getAddProduct,
  deleteProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
} = require("../controllers/admin");

const { isAuth } = require("../middleware/is-auth");

const adminRouter = express.Router();

adminRouter.get("/product-list", isAuth, getProducts);

adminRouter.get("/add-product", isAuth, getAddProduct);
adminRouter.post("/add-product", isAuth, postAddProduct);

adminRouter.get("/edit-product/:productID", isAuth, getEditProduct);
adminRouter.post("/edit-product", isAuth, postEditProduct);

adminRouter.delete("/product-list/:productID", isAuth, deleteProduct);

module.exports = {
  adminRouter,
};
