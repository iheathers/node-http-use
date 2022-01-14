const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://heathids:heathids@cluster0.nyqib.mongodb.net/myDigitalShop?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let _db;

const mongoConnect = async () => {
  try {
    await client.connect();
    _db = client.db("digitalShop");
    console.log("Connected to database");
  } catch (err) {
    throw err;
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database";
};

module.exports = { getDb, mongoConnect };
