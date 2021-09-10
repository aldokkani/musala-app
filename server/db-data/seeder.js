const faker = require('faker');
const mongoose = require('mongoose');

const seedData = Array(3)
  .fill(null)
  .map(() => ({
    name: faker.internet.domainWord(),
    ipv4: faker.internet.ip(),
    devices: Array(2)
      .fill(null)
      .map(() => ({
        _id: mongoose.Types.ObjectId(),
        vendor: faker.company.companyName(),
        statues: ['Online', 'Offline'][Math.floor(Math.random() * 2)],
      })),
  }));

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/musaladb');

    const collection = mongoose.connection.collection('gateways');
    await collection.drop().catch(() => {});

    await collection.insertMany(seedData);

    await mongoose.disconnect();
    console.log('DB seeding is done.');
  } catch (error) {
    console.log(error.stack);
  }
};

if (process.env.NODE_ENV === 'development') {
  seed();
}

module.exports = seedData;
