'use strict';

var express = require('express');
var controller = require('./broker.controller');

var router = express.Router();

router.post('/task', controller.task);
router.get('/task/:id', controller.result);

module.exports = router;