const mongoose = require('mongoose');
const seedData = require('../db-data/seeder');

const connectDB = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();
  await mongoose.connect('mongodb://127.0.0.1/testdb');
};

const closeDB = async () => {
  await mongoose.disconnect();
};

const clearAndInitCollection = async (colName) => {
  const collection = mongoose.connection.collection(colName);
  await collection.drop().catch(() => {});

  await collection.insertMany(seedData);
};

module.exports = {
  connectDB,
  closeDB,
  clearAndInitCollection,
};
