const { ObjectId } = require("mongodb");

const { getDb } = require("../utils/database");

class User {
  constructor(username, emailID) {
    this.username = username;
    this.emailID = emailID;
  }

  async save() {
    const db = getDb();

    return await db.collection("users").insertOne(this);
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
