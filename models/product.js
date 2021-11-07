const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
console.log({ rootDir });

const filePath = path.join(rootDir, 'data', 'products.json');

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    console.log('Saving product...');

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

  static async fetchAll() {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filePath, (err, data) => {
          if (data) {
            console.log({ data });
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
