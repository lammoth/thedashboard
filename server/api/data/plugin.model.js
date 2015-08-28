'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

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


PluginSchema.statics.checkAndUpdate = function(plugins, cb) {
  // TODO: Manage errors
  this
    .find()
    .exec(function(err, results) {
      var pluginsToUpdate = [];
      if (results) {
        _.forEach(plugins, function(plugin) {
          var inside = false;
          _.forEach(results, function(result) {
            if (result.pluginName == plugin.pluginName) {
              inside = true;
            }
          });
          if (!inside) {
            pluginsToUpdate.push(plugin);
            inside = false;
          }
        });

        if (pluginsToUpdate.length > 0) {
          saveAll(pluginsToUpdate);
          cb();
        } else {
          cb();  
        }
      } else {
        saveAll(plugins);
        cb();
      }
    });

  function saveAll(list) {
    _.forEach(list, function(element) {
      var doc = new Plugin(element);
      doc.save(function(err, result) {
        if (err) console.log(err);
      });
    });
  }
};

var Plugin = mongoose.model('Plugin', PluginSchema);
module.exports = Plugin;