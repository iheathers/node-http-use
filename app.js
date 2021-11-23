const express = require('express');

const userRoutes = require('./routes/shop');
const { adminRouter } = require('./routes/admin');

const { sequelize } = require('./utils/database');
const { getErrorPage } = require('./controllers/error');

const { User } = require('./models/user');
const { Product } = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRouter);
app.use(userRoutes);

app.use(getErrorPage);

User.hasMany(Product);
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'John', email: 'John@test.com' });
    }
    return user;
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is running on port ${process.env.PORT} || 3000`);
    });
  })
  .catch((err) => console.log(err));
