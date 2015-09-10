/**
 * Spark acquisition engine
 */

var Q = require('q');
var genericPool = require('generic-pool');
var jdbc = require('jdbc');

module.exports = connect;

var PhoenixPlugin =  function(acquisitor, config) {
  // Plugin needs its acquisitor parent
  this.acquisitor = acquisitor;
  // isConnected true if the plugin is in use
  this.isConnected = false;
  this.config = config;
  this.queryClient = null;
};

PhoenixPlugin.prototype.connect = function(){
  this.isConnected = true;

  var deferred = Q.defer();
  var parent = this;

  parent.pool = genericPool.Pool({
    name: 'phoenix-jdbc-client',
    create: function(cb){
      var jdbcConnection = new jdbc();
      var jdbcConfig = {
        libpath: this.config.libPath,
        drivername: this.config.driverName,
        url: this.config.url,
        user: this.config.auth.user,
        password: this.config.auth.password
      };
      jdbcConnection.initialize(jdbcConfig, function(err, res){
          if (err){
            console.error('Error creating phoenix jdbc driver: ' + err);
            deferred.reject(err);
          } else {
            console.log('Conection created: ' + res)
            cb(null, jdbcConnection);
            deferred.resolve();
          }
      });
    },
    destroy: function(client){
      client.close(function(err){
        if (err){
          console.error("Error closing phoenix jdbc conection: " + err);
        }
      });
    },
    max: this.config.pool.maxConnections,
    // optional. if you set this, make sure to drain() (see step 3)
    min: this.config.pool.minConnections,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: this.config.pool.idleTimeoutMillis,
    // if true, logs via console.log - can also be a function
    log: this.config.pool.verboseLog;
  };

  return deferred.promise;
}

PhoenixPlugin.prototype.close = function(cb) {
  this.isConnected = false;
  console.log('PhoenixPlugin needs to improve close function.');
  cb();
}
