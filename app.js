const express = require('express');

const userRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.send('Page not found');
});

app.listen(4000);
