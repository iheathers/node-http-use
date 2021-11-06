const express = require('express');

const ehbs = require('express-handlebars');

const userRoutes = require('./routes/shop');
const { adminRouter } = require('./routes/admin');

const app = express();

app.engine(
  'hbs',
  ehbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRouter);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Error 404' });
});

app.listen(4000);
