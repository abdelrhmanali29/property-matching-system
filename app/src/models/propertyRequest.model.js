const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const propertyRequestSchema = mongoose.Schema(
  {
    propertyType: {
      type: String,
      enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'],
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    refreshedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

propertyRequestSchema.plugin(toJSON);
propertyRequestSchema.plugin(paginate);

const PropertyRequest = mongoose.model('PropertyRequest', propertyRequestSchema);

module.exports = PropertyRequest;
