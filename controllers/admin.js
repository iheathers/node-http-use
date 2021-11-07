const getProducts = (req, res, next) => {
  res.render('admin/product-list', {
    pageTitle: 'Admin Products',
    path: '/admin/product-list',
  });
};

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const product = new Product(title);
  product.save();

  res.redirect(301, '/');
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
};
