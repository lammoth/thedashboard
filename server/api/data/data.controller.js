'use strict';

var _ = require('lodash');
var Data = require('./data.model');
var config = require('../../config/general');
var Plugin = require('../../plugins');
var pluginsConfig = require('../../config/plugins');

// Get list of datas
exports.index = function(req, res) {
  Data.find(function (err, datas) {
    if(err) { return handleError(res, err); }
    return res.json(200, datas);
  });
};

// Get a single data
exports.show = function(req, res) {
  Data.findById(req.params.id, function (err, data) {
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
    return res.json(data);
  });
};

// Creates a new data in the DB.
exports.create = function(req, res) {
  Data.create(req.body, function(err, data) {
    if(err) { return handleError(res, err); }
    return res.json(201, data);
  });
};

// Updates an existing data in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Data.findById(req.params.id, function (err, data) {
    if (err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
    var updated = _.merge(data, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, data);
    });
  });
};

// Deletes a data from the DB.
exports.destroy = function(req, res) {
  Data.findById(req.params.id, function (err, data) {
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
    data.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

// Extra controllers

// Get datasources list
exports.sources = function(req, res) {
  var plugin = new Plugin(req.app, pluginsConfig);
  if (req.app.get('plugins').length > 0) {
    var activePlugins = plugin.activePlugins(req.app.get('plugins'), req.params.name);
  }
  // if (req.app.get('plugins').length > 0) {
  //   console.log(req.params.name);
  //   _.forEach(req.app.get('plugins'), function(plugin){
  //     if (plugin.active === true && plugin.name === req.params.name) {
  //       console.log(plugin);
  //     }
  //   });
  // }

  return res.json(
    {
      response: "ok"
    }
  );
};