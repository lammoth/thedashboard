'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrokerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Broker', BrokerSchema);