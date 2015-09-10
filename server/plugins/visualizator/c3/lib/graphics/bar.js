var _ = require('lodash');

module.exports = BarC3;

function BarC3(data, raw, promise) {
  this.graph = {};
  this.data = data;
  this.raw = raw;
  this.promise = promise;
}

function prepareColumns(raw, data) {
  var barData = [];
  var timeseriesField = null;
  _.forEach(raw.datasource.fields, function(field) {
    if (field.type === 'timestamp') {
      timeseriesField = field.name;
    }
  });

  _.forEach(raw.fields, function(value, field) {
    if (timeseriesField === field) {
      var formattedDates = [];
      var tsArray = _.map(data, field);
      _.forEach(tsArray, function(ts) {
        var fDate = new Date(ts);
        formattedDates.push(
          fDate.getFullYear() + '-' + 
          (0 + String(fDate.getMonth())).slice(-2) + '-' 
          + (0 + String(fDate.getDay())).slice(-2) + ' ' 
          + fDate.getHours() + ':' + fDate.getMinutes() + ':' 
          + fDate.getSeconds());
      });
      barData.push([field].concat(formattedDates));
    } else {
      barData.push([field].concat(_.map(data, field)));
    }
  });

  return barData;
}

function prepareAxis(raw) {
  var axis = {x: [], y: []};
  
  if (raw.graph.x) {
    _.forEach(raw.graph.x, function(field) {
      var xData = {};
      if (field.field.type === 'timestamp') {
        xData.type = 'timeseries';
        xData.tick = {
          format: '%Y-%m-%d %H:%M:%S',
          rotate: 75
        };
      }
      ((xData) ? axis.x = xData : console.log("No X axis to push"));
    });
  }

  if (raw.graph.y) {
    _.forEach(raw.graph.y, function(field) {
      var yData = {};
      if (field.field.type === 'timestamp') {
        yData.type = 'timeseries';
        yData.tick = {
          format: '%Y-%m-%d %H:%M:%S'
        };
      }
      ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    });
  }

  return axis;
}

function prepareFields(raw) {
  var fields = [];
  var timeseriesField = null;

  _.forEach(raw.datasource.fields, function(field) {
    if (field.type === 'timestamp') {
      timeseriesField = field.name;
    }
  });

  _.forEach(raw.fields, function(value, field) {
    if (timeseriesField) {
      if (field != timeseriesField) {
        fields.push(field);
      }
    } else {
      fields.push(field);
    }
  });

  return fields;
}

BarC3.prototype.dataset = function() {
  // Data info
  this.graph.data = {
    type: 'bar',
    xFormat: '%Y-%m-%d %H:%M:%S',
    columns: prepareColumns(this.raw, this.data),
    x: this.raw.graph.x[0].field.name
  }
  
  // Axis info
  this.graph.axis = prepareAxis(this.raw);

  // Fields info (this is a fake option)
  this.graph.fields = prepareFields(this.raw);

  // Returns the graph data
  this.promise.resolve(this.graph);
}
