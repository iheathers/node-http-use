const { ObjectId } = require("mongodb");

const { Product } = require("./product");
const { getDb } = require("../utils/database");

class User {
  constructor(username, emailID, cart, userID) {
    this.username = username;
    this.emailID = emailID;
    this.cart = cart || { items: [] };
    this._id = userID && new Object(userID);
  }

  async save() {
    const db = getDb();

    return await db.collection("users").insertOne(this);
  }

  async addToCart(product) {
    const db = getDb();

    let updatedQuantity = 1;
    let updatedCartItems = [...this.cart.items];

    const existingCartItemIndex = this.cart.items.findIndex(
      (cartItem) => cartItem.productId.toString() === product._id.toString()
    );

    if (existingCartItemIndex >= 0) {
      updatedCartItems[existingCartItemIndex].quantity++;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: updatedQuantity,
      });
    }

    await db.collection("users").updateOne(
      { _id: this._id },
      {
        $set: {
          cart: {
            items: updatedCartItems,
          },
        },
      }
    );
  }

  async getCart() {
    const cartProduct = [];

    for (const cartItem of this.cart.items) {
      cartProduct.push({
        ...(await Product.findById(cartItem.productId)),
        quantity: cartItem.quantity,
      });
    }

    return cartProduct;
  }

  async deleteCartItem(productId) {
    const db = getDb();

    await db.collection("users").updateMany(
      {},
      {
        $pull: {
          "cart.items": {
            productId: new ObjectId(productId),
          },
        },
      }
    );
  }

  static async findByID(userID) {
    const db = getDb();

    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userID) });

      return user;
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = { User };
