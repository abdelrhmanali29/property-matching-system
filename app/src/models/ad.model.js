const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const adSchema = mongoose.Schema(
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
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

adSchema.plugin(toJSON);
adSchema.plugin(paginate);

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
