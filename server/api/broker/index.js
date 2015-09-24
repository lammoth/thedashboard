'use strict';

var express = require('express');
var controller = require('./broker.controller');

var router = express.Router();

router.post('/task', controller.task);
router.get('/task/:id', controller.taskResult);
router.get('/time', controller.time);
router.post('/time', controller.time);

module.exports = router;