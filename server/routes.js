/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var config = require('./config/general');

module.exports = function(app) {

  // Insert routes below
  app.use(config.api.path + '/broker', require('./api/broker'));
  app.use(config.api.path + '/users', require('./api/user'));
  app.use(config.api.path + '/data', require('./api/data'));

  app.use('/auth', require('./auth'));
  app.use('/info', require('./info'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
