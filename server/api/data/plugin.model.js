'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

var PluginSchema = new Schema({
  name: String, 
  pluginName: { type: String, unique: true }, 
  pluginTitle: String, 
  enable: Boolean,
  config: { 
    realtime_delay: String,
    listen_ratio: String,
    data_delay_from: String,
    data_delay_to: String
  }
  //Schema.Types.Mixed
});

PluginSchema.statics.getPluginEnabled = function(type, cb) {
  this
    .findOne({enable: true, name: type})
    .exec(function(err, result) {
      if (err) console.log(err);
      cb(result);
    });
};

PluginSchema.statics.setPluginEnable = function(type, name, cb) {
  this
    .find({name: type})
    .exec(function(err, plugins) {
      if (err) {
        return cb(err);
      } else {
        _.forEach(plugins, function(plugin) {
          if (plugin.pluginName === name) {
            plugin.enable = true;
            plugin.save(function(error, doc) {
              if (error) cb(error);
              else cb(null, doc);
            });
          } else {
            plugin.enable = false;
            plugin.save(function(error, doc) {
              if (error) console.log(error, plugin);
            });
          }
        })
        
      }
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
            toSave.push(pluginsdata[index]);    
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

PluginSchema.statics.updatePluginConfig = function(name, value, cb) {
  this
    .find({pluginName: name})
    .exec(function(err, plugins) {
      if (err) {
        return cb(err);
      } else {
        var configuration = plugins[0].config;
        for (var attr in value) { configuration[attr] = value[attr];}
        plugins[0].config = configuration;
        plugins[0].save(function(err,d) {
          if(err) console.log(err);
        });
      }
    });
};

var Plugin = mongoose.model('Plugin', PluginSchema);
module.exports = Plugin;