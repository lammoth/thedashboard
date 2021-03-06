/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio, app);
require('./config/express')(app);
require('./routes')(app);

// Setup plugins system
var pluginsConfig = require('./config/plugins');
var PluginEngine = new (require('./plugins'))(app, pluginsConfig);

// Setup persist system
var Persistor = new (require('./components/engine/lib/persistor'))();
app.set('persistor', Persistor);

// Setup queue system
var Tasker = require('./components/engine/lib/tasker');
var tasker = new Tasker();
app.set('tasker', tasker);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;