'use strict';

var express = require('express');
var controller = require('./info.controller');

var router = express.Router();

// It's necessary check the access to this resource
router.get('/', controller.info);

module.exports = router;