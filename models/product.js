const { v4: uuidv4 } = require('uuid');
const db = require('../utils/database');

class Product {
  constructor(id, title, price, imageURL, description) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  async save() {
    await db.execute(
      'INSERT INTO products (id, title, price, imageURL, description) VALUES (?, ?, ?, ?, ?)',
      [this.id, this.title, this.price, this.imageURL, this.description]
    );
  }

  static async deleteProductWithId(id) {
    await db.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  static async fetchProductWithId(id) {
    const [result, fields] = await db.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (result.length > 0) {
      return result[0];
    }
  }

  static async fetchAll() {
    const [result, fields] = await db.execute('SELECT * FROM products');
    return result;
  }
}

module.exports = { Product };
