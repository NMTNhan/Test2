
const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb+srv://s3924462:s3924462@test.abo4prq.mongodb.net/Test2", { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      return;
    }
    const database = client.db("your_db_name");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
    console.log('Connected to the database successfully');
  });
};

module.exports = { connectToDb, db };