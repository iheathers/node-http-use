const path = require('path');
const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('Route /add-product', req.body);

  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.method, req.body);

  res.send(req.method);
});

module.exports = router;
