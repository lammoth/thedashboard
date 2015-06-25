/**
 * Plugin engine
 */

var glob = require("glob");
var _ = require("lodash");

module.exports = function(app, plugins) {
  var currentPlugins = new Array();

  // Check if plugins array contains only one "name" key
  activePlugins = _.filter(_.uniq(plugins, 'name'), function(plugin) {
    return ((plugin.active) ? true: false);
  });

  if (activePlugins.length > 0) {
    // Collect active plugins
    _.forEach(activePlugins, function(plugin) {
      var path = __dirname + '/' + plugin.name + '/' + plugin.active;
      if (check(path)) {
        plugin.path = path;
        currentPlugins.push(plugin);
      } else {
        throw new Error('You need add an index.js file in the ' + plugin.active + ' plugin');
      }
    });

    // Check if path contains an index.js file
    function check(path) {
      files = glob.sync("index.js", {cwd: path, root: path});
      return ((files && files.length === 1) ? true : false);
    }
  }

  // Plugins setted express app
  app.set('plugins', currentPlugins);
};