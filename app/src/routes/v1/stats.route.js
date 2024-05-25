/**
 * @swagger
 * /v1/stats:
 *   get:
 *     summary: Get stats
 *     description: Retrieve statistics for the users, including ad and request counts and amounts.
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       role:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       status:
 *                         type: string
 *                       adsCount:
 *                         type: integer
 *                       totalAdsAmount:
 *                         type: number
 *                       requestsCount:
 *                         type: integer
 *                       totalRequestsAmount:
 *                         type: number
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 hasNextPage:
 *                   type: boolean
 *                 hasPreviousPage:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');
const auth = require('../../middlewares/auth');
const rightsKeys = require('../../config/rights-keys');
const { statsController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { statsValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(
    auth(rightsKeys.getStats),
    validate(statsValidation.getStats),
    statsController.getStats
  );

module.exports = router;
