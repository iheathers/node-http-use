const path = require('path');
const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const { products } = require('../routes/admin');

router.get('/', (req, res, next) => {
  console.log('Request to /', 'GET', products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
