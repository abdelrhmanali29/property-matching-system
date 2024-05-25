const Joi = require('joi');

const getStats = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  getStats,
};
