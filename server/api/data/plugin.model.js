'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

var PluginSchema = new Schema({
  name: String, 
  pluginName: { type: String, unique: true }, 
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
  var parent = this;
  this
    .find()
    .exec(function(err, results) {
      if (err) {
        console.log(err); 
        cb();
      }
      if (results) {
        var idsA = results.map( function(x){ return x.pluginName; } );
        var idsB = plugins.map( function(x){ return x.pluginName; } );
        _.forEach(idsA, function(plugin, index) {
          if (idsB.indexOf(plugin) === -1) {
            parent.remove({_id: results[index]._id}, function(err, n) {
              if (err) {
                console.error('error removing plugin');
              }
            });   
          }
        });
        var toSave = [];
        _.forEach(idsB, function(plugin, index) {
          if (idsA.indexOf(plugin) === -1) {
            toSave.push(plugins[index]);    
          }
        });
        if (toSave.length) {
          saveAll(toSave);
        }
      }
      cb();
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