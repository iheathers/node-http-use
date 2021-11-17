const { Cart } = require('../models/cart');
const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('admin/product-list', {
    pageTitle: 'Admin Products',
    path: '/admin/product-list',
    products: products,
  });
};

const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

const postAddProduct = (req, res, next) => {
  const { title, price, description, imageURL } = req.body;
  const productID = req.body.id.trim();
  const product = new Product(productID, title, price, imageURL, description);
  product.save();

  res.redirect(301, '/products');
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit === 'true';

  if (!editMode) {
    res.redirect(301, '/products');
  }

  const productID = req.params.productID;

  const product = await Product.fetchProductWithId(productID);

  if (!product) {
    res.redirect(301, '/products');
  }

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    product: product,
    editing: editMode,
  });
};

const postEditProduct = (req, res, next) => {
  const { id, title, price, description, imageURL } = req.body;
  const productID = id.trim();

  const product = new Product(productID, title, price, imageURL, description);
  product.save();

  res.redirect(301, '/products');
};

const deleteProduct = async (req, res, next) => {
  const productID = req.params.productID;

  const product = await Product.fetchProductWithId(productID);

  Cart.deleteProductFromCart(productID, product.price);
  Product.deleteProductWithId(productID);

  res.redirect(301, '/products');
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  deleteProduct,
  getEditProduct,
  postEditProduct,
};
