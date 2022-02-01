const express = require("express");

const {
  getCart,
  postCart,
  postOrder,
  getOrders,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
} = require("../controllers/shop");

const { isAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/", getHomePage);

router.get("/orders", isAuth, getOrders);
router.post("/orders", isAuth, postOrder);

router.get("/products", getProducts);
router.get("/products/:id", getProductDetail);

router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
router.post("/delete-cart-item", isAuth, deleteCartItem);

module.exports = router;
