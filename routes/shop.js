const express = require("express");

const {
  getCart,
  postCart,
  postOrder,
  getOrders,
  getInvoice,
  getProducts,
  getHomePage,
  getCheckout,
  postCheckout,
  deleteCartItem,
  getProductDetail,
  getCheckoutSuccess,
} = require("../controllers/shop");

const { isAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/", getHomePage);

router.get("/orders", isAuth, getOrders);
// router.post("/orders", isAuth, postOrder);

router.get("/products", getProducts);
router.get("/products/:id", getProductDetail);

router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
router.post("/delete-cart-item", isAuth, deleteCartItem);

router.post("/checkout", isAuth, postCheckout);
router.get("/checkout/success", isAuth, getCheckoutSuccess);
router.get("/checkout/cancel", isAuth, getCart);
// router.get("/checkout", isAuth, getCheckout);

router.get("/orders/:orderId", isAuth, getInvoice);

module.exports = router;
