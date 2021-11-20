const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'digital-shop',
  password: 'Qwerty7@12',
});

module.exports = pool.promise();
