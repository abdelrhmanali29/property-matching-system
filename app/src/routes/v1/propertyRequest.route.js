const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rightsKeys = require('../../config/rights-keys');
const { propertyRequestValidation } = require('../../validations');
const { propertyRequestController } = require('../../controllers');

const router = express.Router();

/**
 * @swagger
 * /v1/property-requests:
 *   post:
 *     summary: Create a property request
 *     description: Only authenticated users can create property requests.
 *     tags: [PropertyRequests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyType:
 *                 type: string
 *                 enum: [VILLA, HOUSE, LAND, APARTMENT]
 *                 example: "APARTMENT"
 *               area:
 *                 type: number
 *                 example: 120
 *               price:
 *                 type: number
 *                 example: 300000
 *               city:
 *                 type: string
 *                 example: "New York"
 *               district:
 *                 type: string
 *                 example: "Brooklyn"
 *               description:
 *                 type: string
 *                 example: "A nice apartment in a great location"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the property request
 *                 propertyType:
 *                   type: string
 *                 area:
 *                   type: number
 *                 price:
 *                   type: number
 *                 city:
 *                   type: string
 *                 district:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user:
 *                   type: string
 *                   description: ID of the user who created the property request
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router
  .route('/')
  .post(
    auth(rightsKeys.createPropertyRequest),
    validate(propertyRequestValidation.createPropertyRequest),
    propertyRequestController.createPropertyRequest
  );

router
  .route('/:id')
  .patch(
    auth(rightsKeys.updatePropertyRequest),
    validate(propertyRequestValidation.updatePropertyRequest),
    propertyRequestController.updatePropertyRequest
  );

module.exports = router;
