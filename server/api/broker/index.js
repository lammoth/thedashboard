'use strict';

var express = require('express');
var controller = require('./broker.controller');

var router = express.Router();

router.post('/task/:type/:subtype', controller.task);

module.exports = router;