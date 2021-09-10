const { Schema, model } = require('mongoose');

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

const gatewaySchema = new Schema(
  {
    name: String,
    ipv4: {
      type: String,
      match:
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    },
    devices: [deviceSchema],
  },
  { optimisticConcurrency: true },
);

gatewaySchema.set('toJSON', {
  virtuals: true,
});

const Gateway = model('Gateway', gatewaySchema);

module.exports = Gateway;
