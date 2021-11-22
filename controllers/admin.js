const { Cart } = require('../models/cart');
const { Product } = require('../models/product');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render('admin/product-list', {
      pageTitle: 'Admin Products',
      path: '/admin/product-list',
      products: products,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, price, description, imageURL } = req.body;

  await Product.create({
    title: title,
    price: price,
    imageURL: imageURL,
    description: description,
  });

  res.redirect(301, '/products');
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit === 'true';

  if (!editMode) {
    res.redirect(301, '/products');
  }

  const productID = req.params.productID;

  const product = await Product.findByPk(productID);

  // if (!product) {
  //   res.redirect(301, '/products');
  // }

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    product: product,
    editing: editMode,
  });
};

const postEditProduct = async (req, res, next) => {
  const { id, title, price, description, imageURL } = req.body;
  const productID = id.trim();

  const editedProduct = await Product.findByPk(productID);

  editedProduct.set({
    title: title,
    price: price,
    imageURL: imageURL,
    description: description,
  });

  await editedProduct.save();

  res.redirect(301, '/products');
};

const deleteProduct = async (req, res, next) => {
  const productID = req.params.productID;

  const product = await Product.findByPk(productID);
  product.destroy();

  // Cart.deleteProductFromCart(productID, product.price);
  // Product.deleteProductWithId(productID);

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
