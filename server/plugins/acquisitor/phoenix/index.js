/**
 * Phoenix acquisition engine
 */

var Q = require('q'),
  jdbc = require('jdbc'),
  jinst = require('jdbc/lib/jinst'),
  Pool = require('jdbc/lib/pool'),
  Query = require('./lib/query');

module.exports = PhoenixPlugin;

function PhoenixPlugin(acquisitor, config) {
  // Plugin name
  this.name = 'phoenix';
  // Plugin needs its acquisitor parent
  this.acquisitor = acquisitor;
  // isConnected true if the plugin is in use
  this.isConnected = false;
  this.config = config;
  this.queryClient = null;

  if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath([this.config.java.libPath]);
  }

  this.connection = new Pool(this.config.jdbc);
};

PhoenixPlugin.prototype.connect = function() {
  this.isConnected = true;

  var deferred = Q.defer();
  var parent = this;

  this.connection.initialize(function(err) {
    if (err) {
      console.error('Phoenix error connecting: ' + err);
      deferred.resolve(err);
    } else {
      console.log('Phoenix acquisitor plugin connected');
      parent.queryClient = new Query(parent.connection);
      deferred.resolve();
    }
  });
  
  return deferred.promise;
};

PhoenixPlugin.prototype.close = function(cb) {
  this.isConnected = false;
  console.log('PhoenixPlugin needs to improve close function.');
  cb();
};
