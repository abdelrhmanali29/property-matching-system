const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { authService, userService } = require('../services');

const generateAuthToken = (user) => {
  const payload = {
    sub: user._id.toString(),
  };

  const accessTokenExpires = moment()
    .add(config.jwt.accessExpirationMinutes, 'minutes')
    .unix();

  const options = {
    expiresIn: accessTokenExpires,
  };

  return jwt.sign(payload, config.jwt.secret.toString(), options);
};

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const accessToken = generateAuthToken(user);

  res.status(httpStatus.CREATED).send({ user, accessToken });
});

const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  const user = await authService.login(phone, password);

  const accessToken = generateAuthToken(user);
  res.send({ user, accessToken });
});

module.exports = {
  register,
  login,
};
