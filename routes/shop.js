const express = require('express');

const { products } = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Request to /', 'GET', products);
  console.log({ products });
  // res.sendFile(path.join(path.join(rootDir, 'views', 'shop.html')));
  res.render('shop', { title: 'My dynamic shop', products });
});

module.exports = router;
