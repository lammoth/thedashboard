'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = mongoose.Schema.Types.Mixed;

var DatasourceSchema = new Schema({
  name: String,
  acquisitor: String,
  fields: [
    {
      name: {type: String}, 
      type: {type: String}
    }
  ]
});

DatasourceSchema.statics.checkAndUpdate = function(datasources, cb) {
  // TODO: Manage errors
  var acquisitor = datasources[0].acquisitor;
  this
    .find({acquisitor: acquisitor})
    .exec(function(err, results) {
      var datasourcesToUpdate = [];
      if (err) cb({}, err);

      if (results) {
        _.forEach(datasources, function(datasource) {
          var inside = false;
          _.forEach(results, function(result) {
            if (result.name == datasource.name) {
              var insideField = false;
              _.forEach(datasource.fields, function(field) {
                _.forEach(result.fields, function(rField) {
                  if (rField.name == field.name) {
                    insideField = true;
                  }
                });
              });
              if (insideField) {
                inside = true;
              } else {
                inside = false;
              }
            }
          });

          if (!inside) {
            datasourcesToUpdate.push(datasource);
            inside = false;
          }

        });

        if (datasourcesToUpdate.length > 0) {
          saveAll(datasourcesToUpdate);
          cb();
        } else {
          cb();  
        }
      } else {
        saveAll(datasources);
        cb();
      }
    });

  function saveAll(list) {
    _.forEach(list, function(element) {
      var doc = new Datasource(element);
      doc.markModified('fields');
      doc.save(function(err, result) {
        if (err) console.log(err);
      });
    });
  }
};

var Datasource = mongoose.model('Datasource', DatasourceSchema);
module.exports = Datasource;