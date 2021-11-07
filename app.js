const express = require('express');

const userRoutes = require('./routes/shop');
const { adminRouter } = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRouter);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Error 404' });
});

app.listen(4000);
