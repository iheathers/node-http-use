const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/add-product', (req, res, next) => {
  console.log('Route /add-product');

  console.log('Request: ', req.body);

  res.send(`
  <form action="/product" method="POST">
  <input name='title' type='text'/>
  <button type="submit">Submit</button>
  </form>
  `);
});

app.use('/product', (req, res, next) => {
  console.log('Reqest in /product', req.body);

  res.send('Route /product');
});

app.use('/', (req, res, next) => {
  res.send('route / ');
});

app.listen(4000);
