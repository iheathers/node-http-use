const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const filePath = path.join(rootDir, 'data', 'cart.json');

class Cart {
  static addProduct(productID, productPrice) {
    fs.readFile(filePath, (err, data) => {
      let cart = { items: [], totalPrice: 0 };

      if (!err && data?.length > 0) {
        cart = JSON.parse(data);
      }

      const existingProduct = cart.items.find((item) => item.id === productID);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const product = { id: productID, quantity: 1 };
        cart.items.push(product);
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      console.log(existingProduct === cart.items[0]);

      fs.writeFileSync(filePath, JSON.stringify(cart));
    });
  }

  static deleteProductFromCart(productID, productPrice) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return;
      }

      const cart = JSON.parse(data);
      const product = cart.items.find((item) => item.id === productID);

      if (product) {
        cart.totalPrice = cart.totalPrice - product.quantity * +productPrice;
        cart.items = cart.items.filter((item) => item.id !== productID);
      }

      fs.writeFileSync(filePath, JSON.stringify(cart));
    });
  }

  static async fetchCart() {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            reject(err);
          }

          const cart = JSON.parse(data);
          resolve(cart);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = { Cart };
