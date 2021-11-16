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
}

module.exports = { Cart };
