const Joi = require('joi');

const createAd = {
  body: Joi.object().keys({
    propertyType: Joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required(),
    area: Joi.number().required(),
    price: Joi.number().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const matchPropertyRequest = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createAd,
  matchPropertyRequest,
};
