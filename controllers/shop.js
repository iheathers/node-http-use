const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const { Order } = require("../models/order");
const { Product } = require("../models/product");

const ITEMS_PER_PAGE = 1;

const getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;

  try {
    const totalItems = await Product.countDocuments();

    const products = await Product.find({})
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.render("shop/product-list", {
      pageTitle: "Shop Products",
      path: "/products",
      products: products,
      totalPage: totalItems,
      hasPreviousPage: page > 1,
      currentPage: page,
      hasNextPage: page * ITEMS_PER_PAGE < totalItems,
      previousPage: page - 1,
      nextPage: page + 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      //   isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    const errObj = new Error(error);
    errObj.httpStatusCode = 500;

    return next(errObj);
  }
};

const getProductDetail = async (req, res, next) => {
  const productID = req.params.id;

  try {
    const product = await Product.findById(productID);

    if (product) {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products-detail",
        product: product,
        // isAuthenticated: req.session.isLoggedIn,
      });
    }
  } catch (error) {
    const errObj = new Error(error);
    errObj.httpStatusCode = 500;

    return next(errObj);
  }
};

const getOrders = async (req, res, next) => {
  const orderList = await Order.find({ "user.userId": req.user._id })
    .populate("items.product.productId")
    .exec();

  console.log({ orderList });

  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    orders: orderList,
    // isAuthenticated: req.session.isLoggedIn,
  });
};

const postOrder = async (req, res, next) => {
  const cart = await req.user.getCart();

  const items = cart.map((item) => {
    return {
      product: {
        productId: item.id,
      },
      quantity: item.quantity,
    };
  });

  const order = new Order({
    user: {
      userId: req.user._id,
    },
    items: items,
  });

  await order.save();

  await req.user.clearCart();

  res.redirect("/orders");
};

const getHomePage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Digital Shop",
    path: "/",
  });
};

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    cart: cart,
    // isAuthenticated: req.session.isLoggedIn,
  });
};

const postCart = async (req, res, next) => {
  const productID = req.body.productID.trim();

  try {
    const product = await Product.findById(productID);

    await req.user.addToCart(product);
  } catch (error) {
    const errObj = new Error(error);
    errObj.httpStatusCode = 500;

    return next(errObj);
  }

  res.redirect("/cart");
};

const deleteCartItem = async (req, res, next) => {
  const productID = req.body.productID.trim();

  await req.user.deleteCartItem(productID);

  res.redirect("/cart");
};

const getInvoice = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return next(new Error("Invalid order"));
    }

    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error("Unauthorized operation"));
    }

    const invoiceName = `invoice_${orderId}.pdf`;
    const invoicePath = path.join("data", "invoices", invoiceName);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    doc.pipe(fs.createWriteStream(invoicePath));
    doc.pipe(res);

    doc.fontSize(50).text("Invoice");
    doc.text("-----------");

    order.items.forEach((item) => {
      doc
        .fontSize(20)
        .text(`PrdouctID-${item.product.productId} - ${item.quantity}`);
    });
    doc.end();

    // const file = fs.createReadStream(invoicePath);
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "inline");
    // file.pipe(res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  postCart,
  getOrders,
  postOrder,
  getInvoice,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
};
