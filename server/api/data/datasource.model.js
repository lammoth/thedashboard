'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = mongoose.Schema.Types.Mixed;

var DatasourceSchema = new Schema({
  name: { type: String, unique: true },
  acquisitor: String,
  fields: [
    {
      name: {type: String}, 
      type: {type: String}
    }
  ]
});

DatasourceSchema.statics.checkAndUpdate = function(datasources, cb) {
  var parent = this;
  this
    .find()
    .select('-fields._id')
    .exec(function(err, results) {
      if (err) {
        console.log(err); 
        cb();
      }
      if (results) {
        var idsA = results.map( function(x){ return x.name; } );
        var idsB = datasources.map( function(x){ return x.name; } );
        
        // First seek removed and changed datasources.
        var toUpdate = [];
        _.forEach(idsA, function(datasource, index) {
          if (idsB.indexOf(datasource) === -1) {
            // This old document no longer exists.
            parent.remove({_id: results[index]._id}, function(err, n) {
              if (err) {
                console.error('error removing datasource');
              }
            });   
          } else {
            // This document exists, now seek changes.
            var docResult = results[index];
            var docDataSource = datasources[idsB.indexOf(datasource)];
            var contains = true;
            _.forEach(docDataSource.fields, function(dField) {
              contains = contains && _.some(docResult.fields, dField);
            });
            if (!contains) {
              // There are changes.
              toUpdate.push(docDataSource);
            }
          }
        });
        if (toUpdate.length) {
          updateAll(toUpdate);
        }

        // Second seek new datasources
        var toSave = [];
        _.forEach(idsB, function(datasource, index) {
          if (idsA.indexOf(datasource) === -1) {
            toSave.push(datasources[index]);    
          }
        });
        if (toSave.length) {
          saveAll(toSave);
        }
      }
      cb();
    });

  function saveAll(list) {
    _.forEach(list, function(element) {
      var doc = new Datasource(element);
      doc.save(function(err, result) {
        if (err) console.log(err);
      });
    });
  }

  function updateAll(list) {
    _.forEach(list, function(element) {
      var doc = new Datasource(element);
      parent
        .update(
          {name: element.name},
          {fields: element.fields},
          function(err, datasource) {
            if (err) console.error(err);
          }
        );
    });
  }
};

var Datasource = mongoose.model('Datasource', DatasourceSchema);
module.exports = Datasource;