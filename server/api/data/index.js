'use strict';

var express = require('express');
var controller = require('./data.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Plugins routes
// router.get('/sources/:name', controller.sources);
router.get('/plugins/info', controller.pluginsInfo);
// router.post('/plugins', controller.config);
// router.put('/plugins', controller.config);

// Visualization routes
router.get('/visualizations', auth.hasRole('admin'), controller.visualizations);
router.post('/visualization', controller.visualization);
router.delete('/visualization/:id', auth.hasRole('admin'), controller.destroyVisualization);


// Dashboard routes
router.get('/dashboards', auth.hasRole('admin'), controller.dashboards);
router.post('/dashboard', controller.dashboard);
router.delete('/dashboard/:id', auth.hasRole('admin'), controller.destroyDashboard);

module.exports = router;