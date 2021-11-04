const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('Route /add-product', req.body);

  res.send(`
    <form action="/product" method="POST">
    <input name='title' type='text'/>
    <button type="submit">Submit</button>
    </form>
    `);
});

router.post('/product', (req, res, next) => {
  console.log('Request in /product', req.body);

  res.send('Route /product');
});

module.exports = router;
