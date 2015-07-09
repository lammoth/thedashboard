'use strict';

var express = require('express');
var controller = require('./broker.controller');

var router = express.Router();

router.post('/task/:type', controller.task);
router.post('/task/:type/:job', controller.execute);

module.exports = router;