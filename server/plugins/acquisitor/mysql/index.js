/**
 * MySQL acquisition engine
 */

var mysql = require('mysql'),
    Query = require('./lib/query'),
    Q = require('q');

module.exports = MySQLPlugin;

function MySQLPlugin(acquisitor, data) {

  // Plugin needs its acquisitor parent
  this.acquisitor = acquisitor;

  // isConnected true if the plugin is in use
  this.isConnected = false;

  // MySQL data needed to stablish the connection
  this.data = data;

  // Plugin name
  this.name = 'mysql';

  // MySQL connection
  this.connection = mysql.createConnection({
    host: this.data.address,
    user: this.data.user,
    password : this.data.password,
    database : this.data.database
  });

  // MySQL query lib
  this.queryClient = null;
}

// Return a new MySQL connection
MySQLPlugin.prototype.connect = function() {
  this.isConnected = true;
  var deferred = Q.defer();
  var parent = this;
  this.connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('MySQL connected as id ' + parent.connection.threadId);
    parent.queryClient = new Query(parent.connection);
    deferred.resolve();
  });
  
  return deferred.promise;
};

// Close the MySQL connection
MySQLPlugin.prototype.close = function(cb) {
  this.isConnected = false;
  this.connection.destroy();
  console.log('MySQL connection closed');
  cb();
};
