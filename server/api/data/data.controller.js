'use strict';

var _ = require('lodash'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service'),
  PluginModel = require('./plugin.model'),
  pluginsConfig = require('../../config/plugins'),
  Plugin = require('../../plugins'),
  VisualizationModel = require('./visualization.model'),
  DashboardModel = require('./dashboard.model');


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

function isAdmin(user) {
  return config.userRoles.indexOf(user.role) >= config.userRoles.indexOf('admin');
}

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

/*
 * Return all visualizations filtered by a visualizator and an acquisitor Plugin
 * Only admin role can get all visualizations
 * @query: visualizator (optional)
 * @query: acquisitor (optional)
 */
exports.visualizations = function(req, res) {
  var q = {};
  if (req.query.visualizator && req.query.acquisitor) {
    q.visualizatorPlugin = req.query.visualizator;
    q.acquisitorPlugin = req.query.acquisitor;
  }
  if (isAdmin(req.user) || (req.query.visualizator && req.query.acquisitor)) {
    VisualizationModel.find(q, function(err, data) {
      if(err) { return handleError(res, err); }
      return res.json(201, {response: "ok", data: data});
    });
  } else {
    return res.json(401);
  }
};

/*
 * Delete visualization
 * Only for admin role
 * @param: id
 */
exports.destroyVisualization = function(req, res) {
  VisualizationModel.findByIdAndRemove(req.params.id, function(err, visualization) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
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

/*
 * Return all dashboards filtered by a visualizator and an acquisitor Plugin
 * Only admin role can get all dashboards
 * @query: visualizator (optional)
 * @query: acquisitor (optional)
 */
exports.dashboards = function(req, res) {
  var q = {};
  if (req.query.visualizator && req.query.acquisitor) {
    q.visualizatorPlugin = req.query.visualizator;
    q.acquisitorPlugin = req.query.acquisitor;
  }
  if (isAdmin(req.user) || (req.query.visualizator && req.query.acquisitor)) {
    DashboardModel.find(q, function(err, data) {
      if(err) { return handleError(res, err); }
      return res.json(201, {response: "ok", data: data});
    });
  } else {
    return res.json(401);
  }
};

/*
 * Delete dashboard
 * Only for admin role
 * @param: id
 */
exports.destroyDashboard = function(req, res) {
  DashboardModel.findByIdAndRemove(req.params.id, function(err, dashboard) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
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