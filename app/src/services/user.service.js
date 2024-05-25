const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.isPhoneTaken(userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already registered');
  }
  return User.create(userBody);
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByPhone = async (phone) => {
  return User.findOne({ phone });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByPhone,
};
