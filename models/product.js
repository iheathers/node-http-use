const { ObjectId } = require("mongodb");

const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.imageURL = imageUrl;
    this.description = description;
  }

  async save() {
    console.log("Saving product...");

    const db = getDb();
    await db.collection("products").insertOne(this);
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

      console.log("findByID", { product });

      return product;
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = { Product };
