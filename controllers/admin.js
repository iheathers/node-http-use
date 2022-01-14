const { Db } = require("mongodb");
const { Product } = require("../models/product");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render("admin/product-list", {
      pageTitle: "Admin Products",
      path: "/admin/product-list",
      products: products,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, price, description, imageURL } = req.body;

  const product = new Product(
    title,
    price,
    description,
    imageURL,
    null,
    req.user._id
  );

  await product.save();

  res.redirect(301, "/products");
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit === "true";

  if (!editMode) {
    res.redirect(301, "/products");
  }

  const productID = req.params.productID;

  const product = await Product.findById(productID);

  if (!product) {
    res.redirect(301, "/products");
  }

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/edit-product",
    product: product,
    editing: editMode,
  });
};

const postEditProduct = async (req, res, next) => {
  const { id, title, price, description, imageURL } = req.body;
  const productID = id.trim();

  const editedProduct = new Product(
    title,
    price,
    description,
    imageURL,
    productID
  );

  try {
    await editedProduct.save(productID);
  } catch (error) {
    console.log({ error });
  }

  res.redirect(301, "/products");
};

const deleteProduct = async (req, res, next) => {
  const productID = req.params.productID;

  await Product.delete(productID);

  res.redirect(301, "/products");
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  deleteProduct,
  getEditProduct,
  postEditProduct,
};
