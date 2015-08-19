/**
 * Spark acquisition engine
 */

var mysql = require('mysql'),
    Query = require('./lib/query'),
    Q = require('q');

module.exports = MySQLPlugin;

function MySQLPlugin(data) {

  // MySQL data needed to stablish the connection
  this.data = data;

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
  var deferred = Q.defer();
  var parent = this;
  this.connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + parent.connection.threadId);
    parent.queryClient = new Query(parent.connection);
    deferred.resolve();
  });
  
  return deferred.promise;
};