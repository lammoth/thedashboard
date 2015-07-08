'use strict';

var _ = require('lodash');
var Data = require('./data.model');
var config = require('../../config/general');
var Plugin = require('../../plugins');
var pluginsConfig = require('../../config/plugins');


// Extra controllers

// Get datasources list
exports.sources = function(req, res) {
  // Plugin engine instance
  var plugin = new Plugin(req.app, pluginsConfig);
  var data = null;

  if (req.app.get('plugins').length > 0) {
    data = plugin.activePlugins(req.app.get('plugins'), req.params.name);
  }

  return res.json(
    {
      response: "ok",
      data: data
    }
  );
};


// Get, create or update a config data
exports.config = function(req, res) {
  if (req.method == 'GET') {
    Data.find(function (err, data) {
      if(err) { return handleError(res, err); }
      return res.json(200, {response: "ok", data: data});
    });
  } else if (req.method == 'POST') {
    Data.findOne(function (err, data) {
      if(err) { return handleError(res, err); }
      if (!data) {
        Data.create(req.body, function(err, data) {
          if(err) { return handleError(res, err); }
          return res.json(201, {response: "ok", data: data});
        });
      } else {
        return res.json(201, {response: "error", data: "Can't create a new object"});
      }
    });
  } else if (req.method == 'PUT') {
    Data.findById(req.body._id, function (err, data) {
      if (err) { return handleError(res, err); }
      if(!data) { return res.json({response: "error", data: "No config data found"}); }
      var updated = _.merge(data, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, {response: "ok", data: data});
      });
    });
  }
};


function handleError(res, err) {
  return res.json(
    {
      response: "error",
      data: err
    }
  );
}