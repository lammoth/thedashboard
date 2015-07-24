/**
 * Druid plugin engine
 */

var glob = require("glob"),
  _ = require("lodash")
  PluginModel = require("../api/data/plugin.model.js"),
  Acquisitor = new (require('../components/engine/lib/acquisitor'))();


module.exports = Plugin;

function Plugin(app, plugins) {
  this.currentPlugins = new Array();

  pluginCompile(this);

  function pluginCompile(parent) {
    // Check if plugins array contains only one "name" key
    activePlugins = _.filter(plugins, function(plugin) {
      return ((plugin.active) ? true : false);
    });

    if (activePlugins.length > 0) {
      // Collect active plugins
      _.forEach(activePlugins, function(plugin) {
        var path = __dirname + '/' + plugin.name + '/' + plugin.pluginName;
        if (check(path)) {
          plugin.path = path;
          parent.currentPlugins.push(plugin);
        } else {
          console.log(plugin.pluginName);
          throw new Error('You need add an index.js file in the ' + plugin.pluginName + ' plugin');
        }
      });

      // Check if path contains an index.js file
      function check(path) {
        files = glob.sync("index.js", {cwd: path, root: path});
        return ((files && files.length === 1) ? true : false);
      }
    }

    // Plugins setted express app
    app.set('plugins', parent.currentPlugins);
    console.log('Plugins registered');
    PluginModel.checkAndUpdate(parent.currentPlugins, function() {
      console.log("done");
    });
  }
};

// Get all active plugins related with type
Plugin.prototype.activePlugins = function(plugins, type) {
  var activeP = new Array();
  if (plugins.length > 0) {
    _.forEach(plugins, function(p) {
      if (p.active === true && p.name === type) {
        activeP.push(p);
      }
    });
  }
  return activeP;
};

// Used to load plugins at app boot
Plugin.prototype.load = function(type, app) {
  var parent = this;
  switch(type) {
    case 'acquisitor':
      Acquisitor.plugin().then(function(data) {
        var acquisitorPluginData = Acquisitor.getObject(app.get('plugins'), data);
        var AcquisitorPlugin = new (require(acquisitorPluginData.path))(acquisitorPluginData.config);
        AcquisitorPlugin.connect().then(function() {
          console.log("Acquisitor loaded at boot");
          app.set('acquisitor', AcquisitorPlugin);
        });
      });
      break;
  }
};