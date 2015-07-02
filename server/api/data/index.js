'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

// Extra routes
router.get('/sources/:name', controller.sources);
router.get('/config', controller.config);
router.post('/config', controller.config);
router.put('/config', controller.config);

module.exports = router;