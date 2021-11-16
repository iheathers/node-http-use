const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const rootDir = require('../utils/path');

const filePath = path.join(rootDir, 'data', 'products.json');

class Product {
  constructor(id, title, price, imageURL, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  save() {
    fs.readFile(filePath, (err, data) => {
      let products = [];

      if (!err && data.length > 0) {
        products = JSON.parse(data);
      }

      if (this.id) {
        const productIndex = products.findIndex((item) => item.id === this.id);
        products[productIndex] = this;
      } else {
        this.id = uuidv4();
        products.push(this);
      }

      fs.writeFileSync(filePath, JSON.stringify(products));
    });
  }

  static async fetchProductWithId(id) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filePath, (err, data) => {
          if (data) {
            const products = JSON.parse(data);
            const product = products.find((item) => item.id === id);

            resolve(product);
          }
          resolve({
            id: null,
            title: 'null',
            price: 0,
            description: null,
            imageURL: null,
          });
        });
      } catch {
        reject(err);
      }
    });
  }

  static async fetchAll() {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filePath, (err, data) => {
          if (data.length > 0) {
            resolve(JSON.parse(data));
          }
          resolve([]);
        });
      } catch {
        reject(err);
      }
    });
  }
}

module.exports = { Product };
