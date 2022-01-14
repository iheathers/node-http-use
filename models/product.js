const { ObjectId } = require("mongodb");

const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl, productId, userId) {
    this.title = title;
    this.price = price;
    this.imageURL = imageUrl;
    this.description = description;
    this._id = productId && new ObjectId(productId);
    this.userId = userId;
  }

  async save() {
    console.log("Saving product...");

    const db = getDb();

    if (!this._id) {
      return await db.collection("products").insertOne(this);
    }

    return await this.update(this._id);
  }

  static async findAll() {
    const db = getDb();
    const products = await db.collection("products").find().toArray();

    return products;
  }

  static async findById(productID) {
    const db = getDb();

    try {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(productID) });

      return product;
    } catch (error) {
      console.log({ error });
    }
  }

  async update(productID) {
    const db = getDb();

    try {
      await db.collection("products").updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $set: this,
        }
      );
    } catch (error) {
      console.log({ error });
    }
  }

  static async delete(productID) {
    const db = getDb();

    try {
      await db.collection("products").deleteOne({
        _id: new ObjectId(productID),
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = { Product };
