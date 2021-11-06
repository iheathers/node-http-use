// const pug = require('pug');
const path = require('path');
const express = require('express');

const rootDir = require('../utils/path');

// const compiledPugFunction = pug.compileFile(
//   path.join(rootDir, 'views', 'template.pug')
// );

// console.log(compiledPugFunction({ name: 'Happy' }));

const router = express.Router();

const { products } = require('../routes/admin');

router.get('/', (req, res, next) => {
  console.log('Request to /', 'GET', products);
  res.render('template');
  // res.send(compiledPugFunction({ name: 'Happy' }));
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
