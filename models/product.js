const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const rootDir = require('../utils/path');

const filePath = path.join(rootDir, 'data', 'products.json');

class Product {
  constructor(title, price, imageURL, description) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    this.id = uuidv4();
  }

  save() {
    fs.readFile(filePath, (err, data) => {
      let products = [];

      if (!err) {
        products = JSON.parse(data);
      }

      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) {
          console.log({ err });
        }
      });
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
          if (data) {
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
