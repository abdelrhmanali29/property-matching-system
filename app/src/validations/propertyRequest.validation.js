const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPropertyRequest = {
  body: Joi.object().keys({
    propertyType: Joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required(),
    area: Joi.number().required(),
    price: Joi.number().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const updatePropertyRequest = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      area: Joi.number(),
      price: Joi.number(),
      description: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createPropertyRequest,
  updatePropertyRequest,
};
