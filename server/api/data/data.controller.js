'use strict';

var _ = require('lodash'),
  config = require('../../config/general'),
  PluginModel = require('./plugin.model'),
  pluginsConfig = require('../../config/plugins'),
  Plugin = require('../../plugins'),
  VisualizationModel = require('./visualization.model'),
  DashboardModel = require('./dashboard.model'),
  DatasourceModel = require('./datasource.model');


// // Get datasources list
// exports.sources = function(req, res) {
//   // Plugin engine instance
//   var plugin = new Plugin(req.app, pluginsConfig);
//   var data = null;

//   if (req.app.get('plugins').length > 0) {
//     data = plugin.activePlugins(req.app.get('plugins'), req.params.name);
//   }

//   return res.json(
//     {
//       response: "ok",
//       data: data
//     }
//   );
// };

// Plugins
// Get plugins info
exports.pluginsInfo = function(req, res) {
  PluginModel.find(function (err, data) {
    if(err) { return handleError(res, err); }
    return res.json(200, {response: "ok", data: data});
  });
};


// Visualizations
exports.visualization = function(req, res) {
  if (req.method == 'GET') {
    
  } else if (req.method == 'POST') {
    // TODO: Check if request is correct
    VisualizationModel.create(req.body, function(err, data) {
      if(err) { return handleError(res, err); }
      return res.json(201, {response: "ok", data: data});
    });
  }
};


// Dashboards
exports.dashboard = function(req, res) {
  if (req.method == 'GET') {
    
  } else if (req.method == 'POST') {
    // TODO: Check if request is correct
    DashboardModel.create(req.body, function(err, data) {
      if(err) { return handleError(res, err); }
      return res.json(201, {response: "ok", data: data});
    });
  }
};


// Datasources
exports.datasource = function(req, res) {
  if (req.method == 'POST') {

  }
};


// Get, create or update a plugin data
// exports.config = function(req, res) {
//   if (req.method == 'GET') {
//     PluginModel.find(function (err, data) {
//       if(err) { return handleError(res, err); }
//       return res.json(200, {response: "ok", data: data});
//     });
//   } else if (req.method == 'POST') {
//     PluginModel.findOne(function (err, data) {
//       if(err) { return handleError(res, err); }
//       if (!data) {
//         PluginModel.create(req.body, function(err, data) {
//           if(err) { return handleError(res, err); }
//           return res.json(201, {response: "ok", data: data});
//         });
//       } else {
//         return res.json(201, {response: "error", data: "Can't create a new object"});
//       }
//     });
//   } else if (req.method == 'PUT') {
//     PluginModel.findById(req.body._id, function (err, data) {
//       if (err) { return handleError(res, err); }
//       if(!data) { return res.json({response: "error", data: "No config data found"}); }
//       var updated = _.merge(data, req.body);
//       updated.save(function (err) {
//         if (err) { return handleError(res, err); }
//         return res.json(200, {response: "ok", data: data});
//       });
//     });
//   }
// };


function handleError(res, err) {
  return res.json(
    {
      response: "error",
      data: err
    }
  );
}