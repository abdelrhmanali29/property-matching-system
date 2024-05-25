const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { propertyRequestService } = require('../services');

const createPropertyRequest = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const brand = await propertyRequestService.createPropertyRequest(req.body);

  res.status(httpStatus.CREATED).send(brand);
});

const updatePropertyRequest = catchAsync(async (req, res) => {
  const brand = await propertyRequestService.updatePropertyRequest(
    req.params.id,
    req.body
  );

  res.status(httpStatus.OK).send(brand);
});

module.exports = {
  createPropertyRequest,
  updatePropertyRequest,
};
