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

  _.forEach(raw.fields, function(value, field) {
    barData.push([field].concat(_.map(data, field)));
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
      }
      ((xData) ? axis.x.push(xData) : console.log("No X axis to push"));
    });
  }

  if (raw.graph.y) {
    _.forEach(raw.graph.y, function(field) {
      var yData = {};
      if (field.field.type === 'timestamp') {
        yData.type = 'timeseries';
      }
      ((yData) ? axis.y.push(yData) : console.log("No Y axis to push"));
    });
  }

  return axis;
}

BarC3.prototype.dataset = function() {
  this.graph.data = {
    type: 'bar',
    xFormat: '%Y',
    columns: prepareColumns(this.raw, this.data),
    x: this.raw.graph.x[0].field.name
  }

  this.graph.axis = prepareAxis(this.raw);

  this.promise.resolve(this.graph);
}

  
  // _.map(users, 'user');
  // data: {
  //       x: 'x',
  //       type: 'bar',
  //       xFormat: '%Y',
  //       columns: [
  //           ['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
  //           ['data1', 30, 200, 100, 400, 150, 250],
  //           ['data2', 130, 340, 200, 500, 250, 350]
  //       ]
  //   },
  //   axis: {
  //       x: {
  //           type: 'timeseries',
  //           // if true, treat x value as localtime (Default)
  //           // if false, convert to UTC internally
  //           localtime: false,
  //           tick: {
  //               format: '%Y-%m-%d %H:%M:%S'
  //           }
  //       }
  //   }
