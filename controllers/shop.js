const { Cart } = require('../models/cart');
const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  try {
    const products = await req.user.getProducts();

    res.render('shop/product-list', {
      pageTitle: 'Shop Products',
      path: '/products',
      products: products,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getProductDetail = async (req, res, next) => {
  const productID = req.params.id;

  const products = await req.user.getProducts({
    where: {
      id: productID,
    },
  });

  res.render('shop/product-detail', {
    pageTitle: 'Product Detail',
    path: '/products-detail',
    product: products[0],
  });
};

const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

const getHomePage = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Digital Shop',
    path: '/',
  });
};

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();

  const products = await cart.getProducts();

  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    cart: products,
  });
};

const postCart = async (req, res, next) => {
  const productID = req.body.productID.trim();
  const cart = await req.user.getCart();

  const fetchedCartProduct = await cart.getProducts({
    where: {
      id: productID,
    },
  });

  if (fetchedCartProduct.length > 0) {
    const product = fetchedCartProduct[0];

    product.CartItem.quantity += 1;

    cart.addProduct(product, {
      through: { quantity: product.CartItem.quantity },
    });
  } else {
    const matchedProduct = await req.user.getProducts({
      where: {
        id: productID,
      },
    });

    await cart.addProduct(matchedProduct[0], {
      through: { quantity: 1 },
    });
  }

  res.redirect('/cart');
};

const deleteCartItem = async (req, res, next) => {
  const productID = req.body.productID.trim();

  const cart = await req.user.getCart();

  const product = await cart.getProducts({
    where: {
      id: productID,
    },
  });

  await product[0].CartItem.destroy();

  res.redirect('/cart');
};

module.exports = {
  getCart,
  postCart,
  getOrders,
  getProducts,
  getHomePage,
  deleteCartItem,
  getProductDetail,
};
