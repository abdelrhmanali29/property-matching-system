const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { statsService } = require('../services');

const getStats = catchAsync(async (req, res) => {
  const stats = await statsService.getStats(req, res);

  res.status(httpStatus.OK).send(stats);
});

module.exports = {
  getStats,
};
