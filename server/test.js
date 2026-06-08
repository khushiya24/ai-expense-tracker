require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log("URI found:", uri ? "YES" : "NO");

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();