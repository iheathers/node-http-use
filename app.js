const path = require('path');
const express = require('express');

const userRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(4000);
