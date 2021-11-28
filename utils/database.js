const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digital-shop', 'root', 'Qwerty7@12', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = { sequelize };
