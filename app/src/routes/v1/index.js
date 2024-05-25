const express = require('express');
const authRoute = require('./auth.route');
const config = require('../../config/config');
const adRoute = require('./ad.route');
const propertyRequestRoute = require('./propertyRequest.route');
const statsRoute = require('./stats.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/property-requests',
    route: propertyRequestRoute,
  },
  {
    path: '/ads',
    route: adRoute,
  },
  {
    path: '/stats',
    route: statsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
