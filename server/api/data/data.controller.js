'use strict';

var _ = require('lodash'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service'),
  PluginModel = require('./plugin.model'),
  pluginsConfig = require('../../config/plugins'),
  Plugin = require('../../plugins'),
  VisualizationModel = require('./visualization.model'),
  DashboardModel = require('./dashboard.model'),
  DatasourceModel = require('./datasource.model'),
  persistentPlugins = require('../../config/general').persistentPlugins;


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
  PluginModel.find().lean().exec(function (err, data) {
    if(err) { return handleError(res, err); }
    
    var setup = [];

    _.forEach(_.where(data, { "name":"acquisitor"}), function(d,k) {
      setup = _.where(pluginsConfig, {"pluginName": d.pluginName})[0];

      d['setup'] = {
        'realtime_delay' : setup.config.realtime_delay,
        'listen_ratio'   : setup.config.listen_ratio,
        'data_delay'     : setup.config.data_delay
      };

    });

    return res.json(200, {response: "ok", data: data });
  });

};

// Update plugin
exports.pluginsSetEnable = function(req, res) {
  var type = req.params.type;
  var name = req.params.name;
  if (persistentPlugins.indexOf(type) > -1) {
    PluginModel.setPluginEnable(type, name, function(err, plugin) {
      if(err) { return handleError(res, err); }
      var pluginInUse = req.app.get(type);
      if(!pluginInUse) {
        console.log('No ' + type + ' loaded in the app');
        var engine = new (require('../../components/engine/lib/' + type))();
        engine.init(req.app);
      } else if (!pluginInUse[type]) {
        console.log('Missing ' + type + ' in the plugin: ' + name);
      } else if (!pluginInUse[type].changePlugin) {
        console.log('Missing changePlugin function in the ' + type);
      } else {
        pluginInUse[type].changePlugin();
      }
      return res.json(200, {response: "ok", data: plugin});
    });
  } else {
    return res.json(200, {response: "ok", data: name});
  }
};


// Visualizations
exports.visualization = function(req, res) {
  VisualizationModel.create(req.body.data, function(err, data) {
    if(err) { return handleError(res, err); }
    var persistor = req.app.get('persistor');
    var persistorData = {
      graph: req.body.data.graph,
      type: req.body.data.json.chartType,
      ds: req.body.data.json.datasource.name,
      // TODO: Check if name is unique
      name: req.body.data.name,
      id: data._id,
      time: {
        to: null,
        from: null
      },
      query: req.body.data.query
    }
    persistor.saveVisualization(persistorData).then(function() {
      return res.json(201, {response: "ok", data: data});
    });
  });
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
exports.createDashboard = function(req, res) {
  if (req.method == 'POST') {
    // TODO: Check if request is correct
    DashboardModel.create(req.body.data, function(err, data) {
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
exports.getDashboards = function(req, res) {
  if (isAdmin(req.user)) {
    if (_.isEmpty(req.query)) {
      DashboardModel
        .find()
        .populate('visualizations')
        .exec(function(err, data) {
          if(err) { return handleError(res, err); }
          return res.json(201, {response: "ok", data: data});
        });
    } else {
      DashboardModel
      .findOne(req.query)
      .populate('visualizations')
      .exec(function(err, data) {
        if(err) { return handleError(res, err); }
        return res.json(201, {response: "ok", data: data});
      });
    }
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


// Datasources
exports.datasource = function(req, res) {
  if (req.method == 'GET') {
    var reqData = req.params.data;
    DatasourceModel.find(reqData, function(err, data) {
      if(err) { return handleError(res, err); }
      return res.json(200, {response: "ok", data: data});
    });
  } else if (req.method == 'POST') {
    var datasources = req.body.data;
    DatasourceModel.checkAndUpdate(datasources, function(data, err) {
      if(err) { return handleError(res, err); }
      return res.json(200, {response: "ok", data: data});
    });
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