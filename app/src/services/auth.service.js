const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const login = async (phone, password) => {
  const user = await userService.getUserByPhone(phone);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect phone or password');
  }

  return user;
};

module.exports = {
  login,
};
