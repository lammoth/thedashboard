'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PluginSchema = new Schema({
  name: String, 
  pluginName: String, 
  pluginTitle: String, 
  enable: Boolean
});

module.exports = mongoose.model('Plugin', PluginSchema);