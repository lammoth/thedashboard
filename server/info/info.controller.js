'use strict';


var config = require('../config/general');


// Global resoruces
exports.info = function(req, res) {
  return res.json(
    {
      response: "ok",
      data: {
        api: config.api,
        plugins: config.plugins
      }
    }
  );
};