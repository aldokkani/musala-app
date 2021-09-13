const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mockData } = require('../db-data/seeder');

const connectDB = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    dbName: 'memoryTestDB',
    useUnifiedTopology: true,
  });
};

const closeDB = async () => {
  await mongoose.disconnect();
};

const clearAndInitCollection = async (colName) => {
  const collection = mongoose.connection.collection(colName);
  await collection.drop().catch(() => {});

  await collection.insertMany(mockData);
};

module.exports = {
  connectDB,
  closeDB,
  clearAndInitCollection,
};
