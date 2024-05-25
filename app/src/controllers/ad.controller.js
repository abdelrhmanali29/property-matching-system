const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { adService } = require('../services');

const createAd = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const ad = await adService.createAd(req.body);

  res.status(httpStatus.CREATED).send(ad);
});

const matchPropertyRequest = catchAsync(async (req, res) => {
  const brand = await adService.matchPropertyRequests(
    req.params.id,
    req.query.page,
    req.query.limit
  );

  res.status(httpStatus.OK).send(brand);
});

module.exports = {
  createAd,
  matchPropertyRequest,
};
