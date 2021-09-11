const { Schema } = require('mongoose');

const deviceSchema = new Schema(
  {
    vendor: String,
    status: {
      type: String,
      enum: ['Online', 'Offline'],
    },
  },
  {
    timestamps: { updatedAt: false },
    optimisticConcurrency: true,
  },
);

deviceSchema.set('toJSON', {
  virtuals: true,
});

module.exports = deviceSchema;
