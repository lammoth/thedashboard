'use strict';

var express = require('express');
var controller = require('./data.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Plugins routes
// router.get('/sources/:name', controller.sources);
router.get('/plugins/info', controller.pluginsInfo);
router.post('/plugins/enable/:type/:name', controller.pluginsSetEnable);
// router.post('/plugins', controller.config);
// router.put('/plugins', controller.config);

// Visualization routes
router.get('/visualizations', auth.isAuthenticated(), controller.visualizations);
router.post('/visualizations', controller.visualization);
router.put('/visualizations/:id', controller.visualization);
router.delete('/visualization/:id', auth.hasRole('admin'), controller.destroyVisualization);


// Dashboard routes
router.get('/dashboards', auth.isAuthenticated(), controller.getDashboards);
router.post('/dashboards', controller.createDashboard);
router.delete('/dashboards/:id', auth.hasRole('admin'), controller.destroyDashboard);

// Datasource routes
router.get('/datasource', controller.datasource);
router.post('/datasource', controller.datasource);

module.exports = router;