'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataSchema = new Schema({
  plugins: [
    { name: String, pluginName: String, pluginTitle: String, enable: Boolean }
  ]
});

module.exports = mongoose.model('Data', DataSchema);