'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PluginSchema = new Schema({
  name: String, 
  pluginName: String, 
  pluginTitle: String, 
  enable: Boolean
});

PluginSchema.statics.getPluginEnabled = function(type, cb) {
  this
    .findOne({enable: true, name: type})
    .exec(function(err, result) {
      if (err) console.log(err);
      cb(result);
    });
};

module.exports = mongoose.model('Plugin', PluginSchema);