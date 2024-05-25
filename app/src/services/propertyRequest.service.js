/* eslint-disable no-return-assign */
const { PropertyRequest } = require('../models');

const createPropertyRequest = async (data) => {
  const propertyRequest = new PropertyRequest(data);
  await propertyRequest.save();
  return propertyRequest;
};

const updatePropertyRequest = async (id, updates) => {
  const propertyRequest = await PropertyRequest.findById(id);
  if (!propertyRequest) {
    throw new Error('Property request not found');
  }

  Object.keys(updates).forEach((update) => (propertyRequest[update] = updates[update]));
  await propertyRequest.save();
  return propertyRequest;
};

module.exports = {
  createPropertyRequest,
  updatePropertyRequest,
};
