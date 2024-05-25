const express = require('express');
const validate = require('../../middlewares/validate');

const { adValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const rightsKeys = require('../../config/rights-keys');
const { adController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth(rightsKeys.createAd),
    validate(adValidation.createAd),
    adController.createAd
  );

router
  .route('/:id')
  .get(
    auth(rightsKeys.matchPropertyRequest),
    validate(adValidation.matchPropertyRequest),
    adController.matchPropertyRequest
  );

module.exports = router;
