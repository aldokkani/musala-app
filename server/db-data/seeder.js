const faker = require('faker');
const mongoose = require('mongoose');

const mockData = Array(3)
  .fill(null)
  .map(() => ({
    name: faker.internet.domainWord(),
    ipv4: faker.internet.ip(),
    devices: Array(2)
      .fill(null)
      .map(() => ({
        _id: mongoose.Types.ObjectId(),
        vendor: faker.company.companyName(),
        status: ['Online', 'Offline'][Math.floor(Math.random() * 2)],
        createdAt: faker.date.past(),
      })),
  }));

const runSeeder = async () => {
  try {
    const collection = mongoose.connection.collection('gateways');
    await collection.drop().catch(() => {});

    await collection.insertMany(mockData);

    // await mongoose.disconnect();
    console.log('DB seeding is done.');
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = {
  runSeeder,
  mockData,
};
