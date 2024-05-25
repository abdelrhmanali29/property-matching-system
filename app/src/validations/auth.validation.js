const Joi = require('joi');
const { password, phone } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().custom(phone).required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid('CLIENT', 'AGENT').required(),
  }),
};

const login = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
