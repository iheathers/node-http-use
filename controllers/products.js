const products = [];

const getAddProduct = (req, res, next) => {
  console.log('Route /add-product', 'GET', req.body);

  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  console.log('Route /add-product', 'POST', req.body);

  products.push(req.body);
  res.redirect('/');
};

const getProducts = (req, res, next) => {
  console.log('Route /', 'GET', req.body);

  res.render('shop', {
    pageTitle: 'Shop',
    path: '/',
    products: products,
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
