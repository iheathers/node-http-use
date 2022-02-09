const { Product } = require("../models/product");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    // const products = await Product.find({ userID: req.user._id });

    res.render("admin/product-list", {
      pageTitle: "Admin Products",
      path: "/admin/product-list",
      products: products,
      isAuthenticated: req.session.isLoggedIn,
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
    isAuthenticated: req.session.isLoggedIn,
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, price, description, imageURL } = req.body;

  const userID = req.user._id;

  const product = new Product({
    title,
    price,
    imageURL,
    description,
    userID,
  });

  try {
    await product.save();
  } catch (error) {
    console.log("postAddProduct", { error });
  }

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

  if (product.userID.toString() !== req.user._id.toString()) {
    console.log("Unauthorized user");

    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/edit-product",
    product: product,
    editing: editMode,
    isAuthenticated: req.session.isLoggedIn,
  });
};

const postEditProduct = async (req, res, next) => {
  const { id, title, price, description, imageURL } = req.body;
  const productID = id.trim();

  try {
    await Product.updateOne(
      { _id: productID },
      {
        title,
        price,
        description,
        imageURL,
      }
    );
  } catch (error) {
    console.log({ error });
  }

  res.redirect(301, "/products");
};

const deleteProduct = async (req, res, next) => {
  const productID = req.params.productID;

  try {
    const { deletedCount } = await Product.deleteOne({
      _id: productID,
      userID: req.user._id,
    });

    if (!deletedCount) {
      console.log({ deletedCount });
      console.log("Unauthorized user");
    }
  } catch (error) {
    console.log("deleteProduct", { error });
  }

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
